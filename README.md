# 🎥 **Video Streaming App** 🎬

A modern video streaming platform built with **React.js**, **Tailwind CSS**, **Flowbite**, and a **Spring Boot** backend. This app supports video upload, streaming, and playback functionalities, offering a sleek and responsive user interface. The app is optimized with **HLS (HTTP Live Streaming)** for smooth and efficient video playback.

## 🚀 **Features**
- Seamlessly upload and play videos through an interactive user interface.
- Stream videos using **HLS.js** for enhanced playback experience.
- Upload videos via an intuitive form.
- Dynamic video player with auto-resume functionality.
- Fully **responsive design** using Tailwind CSS for smooth use across all devices.

---

## 🛠️ **Tech Stack**
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Spring Boot (Java)
- **Video Playback**: HLS.js (for live streaming)
- **UI Library**: Flowbite (React components)
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind CSS (with a custom configuration)

---

## 🚀 **Getting Started**

### Prerequisites
Before you get started, make sure you have the following tools installed:
- **Node.js** (v16.x or higher) - [Install Node.js](https://nodejs.org/)
- **npm** (v7 or higher) - It comes bundled with Node.js, but you can update it using `npm install -g npm`.
- **JDK 11 or higher** - [Download JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Maven** (for Spring Boot) - [Install Maven](https://maven.apache.org/install.html)

### 1. Clone the repository
Clone the repo to your local machine:

```bash
git clone https://github.com/shobhit15082003/Streaming-App-Spring-boot.git
```

### 2. Install frontend dependencies
Navigate to the frontend directory and install all required dependencies:

```bash
cd video-streaming-app/frontend
npm install
```

### 3. Set up and run the backend
Navigate to the backend directory and start the Spring Boot application:

```bash
cd video-streaming-app/backend
mvn spring-boot:run
```

The Spring Boot application will run at `http://localhost:8080`, handling video upload and streaming functionalities.

### 4. Run the frontend development server
Once the backend is up, navigate back to the frontend directory and run the development server:

```bash
cd video-streaming-app/frontend
npm start
```

The app will be accessible at `http://localhost:3000`.

---

## 🛠️ **Backend Setup (Spring Boot)**

### Backend Responsibilities
The Spring Boot backend is responsible for:
- Handling video uploads (using `MultipartFile`).
- Serving video files using HLS for seamless playback.
- Storing video metadata (title, file path, etc.).

### Video Upload Endpoint
The backend exposes an endpoint to upload videos:

- **POST /api/v1/videos/upload** – Upload a video with a title and file.

**Example Request:**
```bash
POST http://localhost:8080/api/v1/videos/upload
Content-Type: multipart/form-data

{ "file": <file>, "title": "Sample Video" }
```

After upload, the backend processes the video and returns an ID, which can be used to fetch and stream the video.

### Video Streaming Endpoint
To stream a video, use the following endpoint:

- **GET /api/v1/videos/{videoId}/master.m3u8** – Streams the video using HLS based on the provided video ID.

---

## 📼 **How to Use**

### 1. Upload Video
- Navigate to the **Upload Video** page in the app.
- Enter a **title** for your video and select a video file.
- Click **Upload** to submit the video to the backend.
- After uploading, the video will be available for streaming.

### 2. Play Video
- Enter the **Video ID** (provided after the upload).
- Click **Play** to begin streaming the video.
- The **HLS.js** player will render and start streaming the video.

---

## 🎨 **UI Customization**
The app uses **Tailwind CSS** for styling, making it easy to modify the design. You can change the look and feel by adjusting the variables in the `tailwind.config.js` file.

**Key color variables**:
- **Deep Blue**: `#081c3b`
- **Electric Blue**: `#0abde3`
- **Neon Green**: `#00e676`
- **Charcoal**: `#333333`

---

## 📢 **Contributing**
We welcome contributions! Here's how you can help:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 🙏 **Acknowledgments**
- **Tailwind CSS** for making responsive design simple and efficient.
- **Flowbite** for providing ready-to-use React components.
- **HLS.js** for enabling seamless video streaming.
- **Spring Boot** for providing a powerful and easy-to-use backend framework.
- **React** for its flexible and efficient UI development capabilities.

---

Feel free to reach out if you need further assistance with anything!
