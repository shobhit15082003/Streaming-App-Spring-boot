# 🎥 **Video Streaming App** 🎬

A modern **video streaming app** built with **React.js**, **Tailwind CSS**, **Flowbite**, and a **Spring Boot** backend that supports video upload, streaming, and playback functionalities. This app provides a sleek user interface with dynamic and interactive components and is optimized with **HLS (HTTP Live Streaming)** for video playback.

## Features
- Upload and play videos in a **seamless and interactive interface**.
- Supports video streaming using **HLS.js** for enhanced playback.
- Upload videos through an intuitive interface.
- Dynamic video player with auto-resume functionality.
- **Responsive design** using Tailwind CSS for a fluid experience across devices.

---

## 📦 **Tech Stack**
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Spring Boot (Java)
- **Video Playback**: HLS.js for live streaming
- **UI Library**: Flowbite (React components)
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind CSS (with a custom configuration)

---

## 🚀 **Getting Started**

### Prerequisites

- **Node.js** (v16.x or higher) - [Install Node.js](https://nodejs.org/)
- **npm** (v7 or higher) - npm comes with Node.js, but ensure it's updated to the latest version using `npm install -g npm`.
- **JDK 11 or higher** - [Download JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Maven** (for Spring Boot) - [Install Maven](https://maven.apache.org/install.html)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/video-streaming-app.git
```

### 2. Install frontend dependencies

Navigate to the frontend directory and install all required dependencies:

```bash
cd video-streaming-app/frontend
npm install
```

### 3. Set up and run the backend

Navigate to the backend directory (Spring Boot) and run the application.

```bash
cd video-streaming-app/backend
mvn spring-boot:run
```

This will start the Spring Boot application at `http://localhost:8080`, which will handle the video upload and streaming functionalities.

### 4. Run the frontend development server

Once the backend is running, navigate back to the frontend directory and start the development server:

```bash
cd video-streaming-app/frontend
npm start
```

The application will be available at `http://localhost:3000`.

---

## 🛠️ **Backend Setup (Spring Boot)**

### 1. Set up the backend application:

The Spring Boot backend handles:
- Video uploads (using `MultipartFile`).
- Serving video files via HLS.
- Video metadata storage (like title and file path).

### 2. Video upload endpoint

The backend provides an endpoint to upload videos:

- **POST /api/v1/videos/upload** - Upload a video with the title and file.
  
**Example Request:**
```bash
POST http://localhost:8080/api/v1/videos/upload
Content-Type: multipart/form-data

{ "file": <file>, "title": "Sample Video" }
```

After the upload, the backend processes the video and provides an ID, which can be used to fetch and stream the video.

### 3. Video streaming endpoint

The backend also provides an endpoint to stream video using HLS (master.m3u8).

- **GET /api/v1/videos/{videoId}/master.m3u8** - Streams the video based on the ID provided.

---

## 📼 **How to Use**

### 1. Upload Video
- On the **Upload Video** page, enter a **title** for your video and select a video file from your system.
- Press **Upload** to submit the video to the Spring Boot backend.
- Once uploaded, the video will be available for playback.

### 2. Play Video
- Enter the **Video ID** (provided after the video upload).
- Press **Play** to start streaming the video.

The **HLS.js** video player will render and start playing the video in a smooth, streaming format.

---

## 🎨 **UI Customization**
The app uses **Tailwind CSS** for styling, allowing you to easily modify the look and feel. The custom background gradient and colors are defined in the `tailwind.config.js` file. Feel free to tweak these styles to fit your brand or personal preferences.

Key color variables are defined as:
- **Deep Blue**: `#081c3b`
- **Electric Blue**: `#0abde3`
- **Neon Green**: `#00e676`
- **Charcoal**: `#333333`

---
## 📢 **Contributing**

We welcome contributions! Please follow these steps to contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 🙏 **Acknowledgments**
- **Tailwind CSS** for making responsive design easy and fun.
- **Flowbite** for providing ready-to-use React components.
- **HLS.js** for seamless video streaming.
- **Spring Boot** for providing a powerful and easy-to-use backend framework.
- **React** for its powerful and flexible UI development capabilities.
