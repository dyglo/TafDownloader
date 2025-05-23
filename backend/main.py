from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import os

# Configure FFmpeg paths for Windows
if os.name == 'nt':  # Windows
    ffmpeg_paths = [
        r"C:\ProgramData\chocolatey\bin",
        r"C:\ProgramData\chocolatey\lib\ffmpeg\tools\ffmpeg\bin"
    ]
    os.environ["PATH"] = os.pathsep.join(ffmpeg_paths + os.environ["PATH"].split(os.pathsep))

app = FastAPI()

# Read proxy from environment variable
YTDLP_PROXY = os.getenv("YTDLP_PROXY")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/metadata")
async def get_metadata(data: dict):
    url = data.get("url")
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    ydl_opts = {
        "quiet": True, 
        "skip_download": True,
        "ffmpeg_location": r"C:\ProgramData\chocolatey\bin\ffmpeg.exe",
        "http_headers": {"User-Agent": "Mozilla/5.0"},
        "impersonate": "chrome",
        "sleep_interval": 2,  # seconds to sleep before each download
        "max_sleep_interval": 5  # random sleep up to 5 seconds
    }
    if YTDLP_PROXY:
        ydl_opts["proxy"] = YTDLP_PROXY
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "Too Many Requests" in error_msg:
            raise HTTPException(status_code=429, detail="We are experiencing temporary rate-limiting from YouTube. Please try again later or use a proxy.")
        if "proxy" in error_msg.lower():
            raise HTTPException(status_code=502, detail="There is a problem with the proxy connection. Please try again later.")
        raise HTTPException(status_code=400, detail="Failed to fetch video information. Please try again later.")
    # Prepare qualities
    qualities = []
    for f in info.get("formats", []):
        if f.get("ext") == "mp4" and f.get("height"):
            qualities.append({
                "label": f"{f['height']}p",
                "value": str(f['height']),
                "format": f['ext']
            })
    # Remove duplicates by value
    seen = set()
    unique_qualities = []
    for q in qualities:
        if q["value"] not in seen:
            unique_qualities.append(q)
            seen.add(q["value"])
    # Platform detection
    webpage_url = info.get("webpage_url", "")
    if "youtube" in webpage_url or "youtu.be" in webpage_url:
        platform = "youtube"
    elif "twitter" in webpage_url or "x.com" in webpage_url:
        platform = "twitter"
    elif "instagram" in webpage_url:
        platform = "instagram"
    else:
        platform = "unknown"
    return {
        "title": info.get("title"),
        "thumbnail": info.get("thumbnail"),
        "duration": str(info.get("duration", 0)) + "s",
        "platform": platform,
        "qualities": unique_qualities
    }

@app.post("/api/download")
async def download_video(data: dict):
    url = data.get("url")
    quality = data.get("quality")
    if not url or not quality:
        raise HTTPException(status_code=400, detail="URL and quality are required")
    # Use a temporary filename
    filename = f"download_{os.getpid()}_{quality}.mp4"
    ydl_opts = {
        "format": f"bestvideo[height={quality}]+bestaudio/best[height={quality}]",
        "outtmpl": filename,
        "quiet": True,
        "merge_output_format": "mp4",
        "ffmpeg_location": r"C:\ProgramData\chocolatey\bin\ffmpeg.exe",
        "http_headers": {"User-Agent": "Mozilla/5.0"},
        "impersonate": "chrome",
        "sleep_interval": 2,
        "max_sleep_interval": 5
    }
    if YTDLP_PROXY:
        ydl_opts["proxy"] = YTDLP_PROXY
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        def iterfile():
            with open(filename, "rb") as f:
                yield from f
            os.remove(filename)
        return StreamingResponse(iterfile(), media_type="video/mp4", headers={
            "Content-Disposition": f'attachment; filename="video_{quality}.mp4"'
        })
    except Exception as e:
        error_msg = str(e)
        if os.path.exists(filename):
            os.remove(filename)
        if "429" in error_msg or "Too Many Requests" in error_msg:
            raise HTTPException(status_code=429, detail="We are experiencing temporary rate-limiting from YouTube. Please try again later or use a proxy.")
        if "proxy" in error_msg.lower():
            raise HTTPException(status_code=502, detail="There is a problem with the proxy connection. Please try again later.")
        raise HTTPException(status_code=500, detail="Failed to download the video. Please try again later.")
