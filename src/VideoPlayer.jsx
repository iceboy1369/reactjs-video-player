import React, { useRef, useState, useEffect } from "react";
import './App.css';
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.css';
import hlsQualitySelector from "videojs-hls-quality-selector";


const VideoPlayerMain = () => {

  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);
  const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
  const [vidDuration, setVidDuration] = useState(50000);
  const videoId = "e2280eeb-4cdb-43e7-a34f-36868326b8cb";
  const thumbnailURL =
    "https://vz-a2adf92d-b24.b-cdn.net/e2280eeb-4cdb-43e7-a34f-36868326b8cb/thumbnail.jpg";
  const liveURL =
    "https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd";


  useEffect(() => {
    if (player) {
      player.src({
        src: liveURL,
        type: "application/x-mpegURL",
        withCredentials: false 
      });
      player.poster("");
      setCallFinishVideoAPI(false);
      setVidDuration(50000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, liveURL, thumbnailURL]);

  useEffect(() => {
    if (callFinishVideoAPI) {
      //finishesVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callFinishVideoAPI]);


  useEffect(() => {
    const videoJsOptions = {
      autoplay: true,
      muted:"muted",
      controls: true,
      poster: "",
      sources: [
        {
          src: liveURL,
          type: "application/dash+xml",
          withCredentials: false
        }
      ],
      html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true
      }
    };

    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReady() {
        let qualityLevels = p.qualityLevels();
        qualityLevels.selectedIndex_ = 0;
        qualityLevels.trigger({ type: 'change', selectedIndex: 0 });
      }
    );
    
    let qualityLevels = p.qualityLevels();
    qualityLevels.selectedIndex_ = 0;
    qualityLevels.trigger({ type: 'change', selectedIndex: 0 });
    setPlayer(p);



    return () => {
      if (player) player.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);



  return (
    <div  style={{backgroundColor: "#111111", width:'100px', height: '100px'}}>
      <video
        ref={videoRef}
        onLoadedMetadata={(e, px) => {
          setVidDuration(e.target.duration);
        }}
        onTimeUpdate={(e) => {
          if (e.target.currentTime >= vidDuration - 10) {
            setCallFinishVideoAPI(true);
          }
        }}
        className="vidPlayer video-js vjs-default-skin vjs-big-play-centered"
      ></video>
    </div>
  );
}

export default VideoPlayerMain;
