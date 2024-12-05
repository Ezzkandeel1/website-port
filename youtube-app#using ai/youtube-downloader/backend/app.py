from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import yt_dlp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/download', methods=['POST'])
def download_video():
    try:
        data = request.json
        video_url = data['url']
        resolution = data.get('resolution', 'best')

        download_dir = './downloads'
        os.makedirs(download_dir, exist_ok=True)

        ydl_opts = {
            'format': f'bestvideo[height<={resolution}]+bestaudio/best[height<={resolution}]',
            'outtmpl': os.path.join(download_dir, 'video.mp4')
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_url, download=True)
            filename = ydl.prepare_filename(info_dict)
            return jsonify({
                'status': 'success',
                'message': 'Download started successfully!',
                'filename': filename
            })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True)
