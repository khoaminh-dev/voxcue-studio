Tài liệu API
Tài liệu đầy đủ cho tất cả API endpoint. Sử dụng API key của bạn trong header X-API-Key.

key
API Key:
ak_qQHt6••••••••
visibility
content_copy
refresh
delete
search
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
POST
/tts/generate
Gửi yêu cầu TTS. Cung cấp văn bản (hoặc file .txt) và nguồn audio (upload file, URL, hoặc voice_id). Trả về job_id để theo dõi kết quả.

Authentication
X-API-Key
required
speed
Limits & Quotas
Max Text Length:
500,000 characters
Max File Size:
1 MB (text_file)
Tham số
provider
string
required
TTS provider: "minimax" or "elevenlabs". Determines which backend processes the audio

text
string
optional
Text to convert (required if no text_file). Max 500,000 characters

text_file
file (.txt/.srt/.vtt)
optional
Text file upload (required if no text). Max 1MB. Subtitle formats auto-stripped

voice_id
string
required
Voice ID from library, or "uv_*" ID from your cloned voices

speed
float
optional
Playback speed multiplier, Mini: 0.5 to 2.0, EL Voice: 0.7 to 1.2. Default: 1.0.

pitch
integer
optional
Pitch shift in semitones, -12 to 12 (default: 0).

vol
float
optional
Volume multiplier, 0.01 to 10.0 (default: 1.0).

model
string
optional
TTS model ID. Default Mini: "speech-2.8-hd". Required for EL Voice.

Mini model_id	Name
speech-2.8-hd	Speed 2.8 HD
speech-2.8-turbo	Speed 2.8 Turbo
speech-2.6-hd	Speed 2.6 HD
speech-2.6-turbo	Speed 2.6 Turbo
speech-2.5-hd-preview	Speed 2.5 HD Preview
speech-2.5-turbo-preview	Speed 2.5 Turbo Preview
speech-02-hd	Speech 02 HD
speech-02-turbo	Speech 02 Turbo
speech-01-hd	Speech 01 HD
speech-01-turbo	Speech 01 Turbo
EL Voice model_id	Name
eleven_v3	Eleven v3
eleven_multilingual_v2	Multilingual v2
eleven_flash_v2_5	Flash v2.5
eleven_turbo_v2_5	Turbo v2.5
eleven_turbo_v2	Turbo v2 (EN)
eleven_flash_v2	Flash v2 (EN)
language
string
optional
Language of the text, e.g. "Vietnamese", "English". Enables language-specific normalization

normalize
boolean
optional
Apply text normalization before TTS (default: true). Only active when language is "Vietnamese"

enable_srt
boolean
optional
Generate synchronised SRT subtitles (default: false)

match_srt_time
boolean
optional
Adjust speech speed (0.5x–2.0x) per segment to match SRT timing. Requires enable_srt=true and SRT/VTT input (default: false)

stability
float
optional
EL Voice only: Voice stability (0.0 to 1.0)

similarity
float
optional
EL Voice only: Voice similarity boost (0.0 to 1.0)

style_exaggeration
float
optional
EL Voice only: Style exaggeration (0.0 to 1.0)

use_speaker_boost
boolean
optional
EL Voice only: Use speaker boost (default: true)

Mã lỗi
400
Invalid file type (.txt/.srt/.vtt only) or text file exceeds 1MB
401
Missing or invalid API key
402
Insufficient credits
422
Missing required fields (provider + text or text_file + voice_id)
422
Provider not supported (e.g. provider=unknown)
422
Text exceeds 500,000 character limit
422
Speed must be between 0.5 and 2.0 (0.7 to 1.2 for EL Voice)
422
Pitch must be between -12 and 12 semitones
422
Volume must be between 0.0 and 2.0
503
Service temporarily unavailable
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
# ══════════════════════════════════
# Example 1: Mini
# ══════════════════════════════════
curl -X POST "/api/v1/tts/generate" \
  -H "X-API-Key: your_api_key" \
  -F "provider=minimax" \
  -F "voice_id=abc123" \
  -F "text=Hello world, this is a test." \
  -F "speed=1.0" \
  -F "pitch=0" \
  -F "vol=1.0" \
  -F "model=Speech-01-24K" \
  -F "language=Vietnamese" \
  -F "normalize=true" \
  -F "enable_srt=true"

# ══════════════════════════════════
# Example 2: EL Voice (with voice settings)
# ══════════════════════════════════
curl -X POST "/api/v1/tts/generate" \
  -H "X-API-Key: your_api_key" \
  -F "provider=elevenlabs" \
  -F "model=eleven_multilingual_v2" \
  -F "voice_id=pO13d9sY" \
  -F "text=Hello world, this is an EL Voice test." \
  -F "speed=1.0" \
  -F "stability=0.5" \
  -F "similarity=0.75" \
  -F "style_exaggeration=0.3" \
  -F "use_speaker_boost=true"
Phản hồi
200OK
{
  "job_id": "a1b2c3d4-...",
  "status": "processing"
}Tài liệu API
Tài liệu đầy đủ cho tất cả API endpoint. Sử dụng API key của bạn trong header X-API-Key.

key
API Key:
ak_qQHt6••••••••
visibility
content_copy
refresh
delete
search
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/tts/jobs/{job_id}
Kiểm tra trạng thái và kết quả của job TTS. Hỗ trợ polling tăng dần với ?after=N để chỉ lấy chunk mới.

Authentication
X-API-Key
required
Tham số
job_id
string
required
Job ID from /tts/generate (path parameter)

Mã lỗi
401
Missing or invalid API key
404
Job not found or not owned by you
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/tts/jobs/a1b2c3d4" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "job_id": "a1b2c3d4-...",
  "status": "processing",
  "progress": 0.5,
  "chars_deducted": 150,
  "audio_url": "/audio/123_456789.mp3",
  "srt_url": "/audio/123_456789.srt",
  "segments_url": "/audio/123_456789_segments.zip"
}
Tìm kiếm giọng nói, dự án...

dark_mode

🇻🇳
VI
expand_more
notifications
menu_book
Tài liệu API
Tài liệu đầy đủ cho tất cả API endpoint. Sử dụng API key của bạn trong header X-API-Key.

key
API Key:
ak_qQHt6••••••••
visibility
content_copy
refresh
delete
search
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
DELETE
/tts/jobs/{job_id}
Hủy job TTS đang chạy và hoàn trả credit chưa sử dụng.

Authentication
X-API-Key
required
speed
Limits & Quotas
Rate Limit:
60 requests / minute
Tham số
job_id
string
required
Job ID to cancel (path parameter)

Mã lỗi
401
Missing or invalid API key
404
Job not found or not owned by you
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl -X DELETE "/api/v1/tts/jobs/a1b2c3d4" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "job_id": "a1b2c3d4-...",
  "refunded_chars": 500
}key
API Key:
ak_qQHt6••••••••
visibility
content_copy
refresh
delete
search
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/tts/history
Lấy danh sách phân trang các lần tạo giọng trước đó, mới nhất trước.

Authentication
X-API-Key
required
speed
Limits & Quotas
Rate Limit:
60 requests / minute
Max Page Size:
50 items
Tham số
page
integer
optional
Page number (default: 1)

limit
integer
optional
Items per page, 1-500 (default: 20)

Mã lỗi
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/tts/history?page=1&limit=10" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "items": [
    {
      "id": 42,
      "text": "Hello world...",
      "voice_name": "MyVoice",
      "chunks_total": 1,
      "chunks_success": 1,
      "created_at": "2026-02-28T10:00:00Z",
      "audio_url": "/audio/42_1234567890.mp3",
      "srt_url": "/audio/42_1234567890.srt",
      "segments_url": "/audio/42_1234567890_segments.zip",
      "voice_settings": {
        "provider": "minimax",
        "speed": 1.0,
        "pitch": 0,
        "vol": 1.0,
        "model": "Speech-01-24K",
        "voice_id": "abc123"
      },
      "display_name": null,
      "status": "success",
      "error_message": null
    }
  ],
  "total": 156,
  "page": 1,
  "limit": 10
}key
API Key:
ak_qQHt6••••••••
visibility
content_copy
refresh
delete
search
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/voices
Duyệt thư viện giọng nói với bộ lọc, sắp xếp và phân trang.

Authentication
X-API-Key
required
Tham số
page
integer
optional
Page number (default: 0)

limit
integer
optional
Items per page, 1-100 (default: 30)

sort
string
optional
Sort field (default: cloned_by_count)

gender
string
optional
Filter by gender

age
string
optional
Filter by age group

language
string
optional
Filter by language

category
string
optional
Filter by category

use_case
string
optional
Filter by use case

search
string
optional
Search by name/description

Mã lỗi
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/voices?limit=10&gender=female&language=en" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "voices": [
    {
      "voice_id": "abc123",
      "name": "Sarah",
      "description": "Warm female voice",
      "gender": "female",
      "age": "young",
      "accent": "northern",
      "language": "en",
      "category": "narration",
      "use_case": "entertainment",
      "preview_url": "https://cdn.example.com/preview.mp3",
      "image_url": "https://cdn.example.com/avatar.png",
      "provider": "minimax",
      "cloned_by_count": 42,
      "rate": 3.0,
      "free_users_allowed": true,
      "featured": true
    }
  ],
  "total": 250,
  "page": 0,
  "limit": 10,
  "has_more": true
}key
API Key:
ak_qQHt6••••••••
visibility
content_copy
refresh
delete
search
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/voices/{voice_id}
Xem thông tin chi tiết của một giọng nói từ thư viện.

Authentication
X-API-Key
required
Tham số
voice_id
string
required
Voice ID (path parameter)

Mã lỗi
401
Missing or invalid API key
404
Voice not found
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/voices/abc123" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "voice_id": "abc123",
  "name": "Sarah",
  "description": "Warm female voice",
  "gender": "female",
  "age": "young",
  "accent": "northern",
  "language": "en",
  "category": "narration",
  "use_case": "entertainment",
  "preview_url": "https://cdn.example.com/preview.mp3",
  "image_url": "https://cdn.example.com/avatar.png",
  "provider": "minimax",
  "cloned_by_count": 42,
  "rate": 3.0,
  "free_users_allowed": true,
  "featured": true
}
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
POST
/voices/my/voice_clone
Nhân bản giọng nói từ mẫu audio. Trả về job_id — kiểm tra endpoint trạng thái job để xem kết quả.

Authentication
X-API-Key
required
Tham số
file
file (mp3/wav)
required
Audio file for voice cloning (min 10s, max 20MB)

name
string
required
Voice name (must be unique)

text
string
required
Preview text for sample generation (max 300 chars)

language
string
optional
Language of the voice (e.g. English, Vietnamese)

gender
string
optional
Gender (Male / Female)

description
string
optional
Voice description

remove_noise
boolean
optional
Remove background noise (default: false)

Mã lỗi
400
Invalid file type (only mp3/wav), audio too short (<10s), or exceeds 20MB
401
Missing or invalid API key
402
Insufficient credits
409
Voice with same name already exists
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl -X POST "/api/v1/voices/my/voice_clone" \
  -H "X-API-Key: your_api_key" \
  -F "file=@my_voice.mp3" \
  -F "name=My Custom Voice" \
  -F "text=Hello, this is a sample text for preview." \
  -F "language=English" \
  -F "gender=Male" \
  -F "remove_noise=false"
Phản hồi
200OK
{
  "job_id": "a1b2c3d4-...",
  "status": "processing"
}
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/voices/my/clone_jobs/{job_id}
Kiểm tra trạng thái của job nhân bản giọng nói. Trả về dữ liệu giọng khi hoàn thành.

Authentication
X-API-Key
required
Tham số
job_id
string
required
Job ID from /voices/my/voice_clone (path parameter)

Mã lỗi
401
Missing or invalid API key
404
Job not found or not owned by you
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/voices/my/clone_jobs/a1b2c3d4" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "job_id": "a1b2c3d4-...",
  "status": "completed",
  "voice": {
    "voice_id": "uv_a1b2c3d4",
    "name": "My Custom Voice",
    "language": "English",
    "gender": "Male",
    "created_at": "2026-03-22T19:35:14.445Z",
    "voice_type": "uploaded",
    "generated_audio_cdn_url": "https://cdn.example.com/generated.mp3",
    "generate_text": "Hello, this is a sample text for preview.",
    "audio_url": "/api/v1/voices/my/uv_a1b2c3d4/audio"
  }
}
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/voices/my
Liệt kê tất cả giọng nói trong thư viện cá nhân (đã lưu + đã upload).

Authentication
X-API-Key
required
Mã lỗi
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/voices/my" \\
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "voices": [
    {
      "voice_id": "uv_f7e8d9c0",
      "name": "My Voice",
      "language": "English",
      "gender": "Male",
      "created_at": "2026-02-28T10:00:00Z",
      "voice_type": "uploaded",
      "generated_audio_cdn_url": "https://cdn.example.com/generated.mp3",
      "generate_text": "Hello, this is a sample.",
      "audio_url": "/api/v1/voices/my/uv_f7e8d9c0/audio",
      "shared_voice": null
    }
  ],
  "total": 5
}
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/voices/my/saved-ids
Lấy danh sách voice_id đã bookmark.

Authentication
X-API-Key
required
Mã lỗi
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/voices/my/saved-ids" \\
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "saved_voice_ids": ["abc123", "def456", "ghi789"]
}
Tìm endpoint...
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
POST
/voices/my/save/{voice_id}
Bookmark giọng nói từ thư viện vào bộ sưu tập cá nhân.

Authentication
X-API-Key
required
Tham số
voice_id
string
required
Voice ID to save (path parameter)

Mã lỗi
400
Voice already saved or invalid voice_id
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl -X POST "/api/v1/voices/my/save/abc123" \\
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "message": "Voice saved",
  "voice_id": "abc123"
}graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
DELETE
/voices/my/save/{voice_id}
Xóa bookmark giọng nói khỏi bộ sưu tập cá nhân.

Authentication
X-API-Key
required
Tham số
voice_id
string
required
Voice ID to unsave (path parameter)

Mã lỗi
400
Voice not in saved list
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl -X DELETE "/api/v1/voices/my/save/abc123" \\
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "message": "Voice unsaved",
  "voice_id": "abc123"
}
graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
DELETE
/voices/my/{voice_entry_id}
Xóa giọng nói khỏi thư viện cá nhân.

Authentication
X-API-Key
required
Tham số
voice_entry_id
string
required
Voice public ID, e.g. "uv_a1b2c3d4" (path parameter)

Mã lỗi
401
Missing or invalid API key
404
Voice entry not found or not owned by you
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl -X DELETE "/api/v1/voices/my/uv_a1b2c3d4" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "message": "Voice deleted",
  "voice_id": "uv_a1b2c3d4"
}graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/voices/my/{voice_entry_id}/audio
Tải file audio của giọng nói đã upload.

Authentication
X-API-Key
required
Tham số
voice_entry_id
string
required
Voice public ID, e.g. "uv_a1b2c3d4" (path parameter)

Mã lỗi
401
Missing or invalid API key
404
Voice entry not found or audio file missing
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/voices/my/uv_a1b2c3d4/audio" \
  -H "X-API-Key: your_api_key" \
  --output my_voice.mp3
Phản hồi
200OK
(Binary audio file — audio/mpeg or audio/wav)graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/me/deposits
Lấy lịch sử nạp tiền/credit phân trang.

Authentication
X-API-Key
required
speed
Limits & Quotas
Rate Limit:
60 requests / minute
Max Page Size:
200 items
Tham số
limit
integer
optional
Items per page, 1-200 (default: 50)

offset
integer
optional
Number of items to skip (default: 0)

Mã lỗi
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/me/deposits?limit=10" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "items": [
    {
      "id": 1,
      "transaction_type": "payment_gateway",
      "chars_added": 1000000,
      "char_balance_after": 1001000,
      "amount_paid": 150000.0,
      "note": "SePay payment",
      "payment_ref": "44816123",
      "status": "completed",
      "created_at": "2026-02-28T10:00:00Z"
    }
  ],
  "total": 12
}graphic_eq
Chuyển văn bản thành giọng nói

POST
Tạo giọng nói

GET
Trạng thái Job

DELETE
Hủy Job

GET
Lịch sử tạo giọng
record_voice_over
Thư viện giọng nói

GET
Danh sách giọng nói

GET
Chi tiết giọng nói
library_music
Thư viện của tôi

POST
Nhân bản giọng nói

GET
Trạng thái Job nhân bản

GET
Giọng của tôi

GET
ID giọng đã lưu

POST
Lưu giọng nói

DELETE
Bỏ lưu giọng nói

DELETE
Xóa giọng nói

GET
Tải file audio giọng nói
account_balance_wallet
Số dư & Nạp tiền

GET
Lịch sử nạp tiền

GET
Số dư hiện tại
GET
/me/balance
Lấy số dư credit hiện tại.

Authentication
X-API-Key
required
Mã lỗi
401
Missing or invalid API key
Ví dụ
cURL
Python
JavaScript

content_copy
Copy
curl "/api/v1/me/balance" \
  -H "X-API-Key: your_api_key"
Phản hồi
200OK
{
  "user_id": 10,
  "char_balance": 125000,
  "total_chars_used": 50000
}