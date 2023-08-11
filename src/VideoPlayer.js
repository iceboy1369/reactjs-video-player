import React, { useRef, useState, useEffect } from "react";
import './App.css';
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import videojsqualityselector from 'videojs-hls-quality-selector';
import 'video.js/dist/video-js.css';
import hlsQualitySelector from "videojs-hls-quality-selector";
import { Card } from "@mui/material";


const VideoPlayerMain = (props) => {

  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);
  const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
  const [vidDuration, setVidDuration] = useState(50000);
  const videoId = props.videoId; //"e2280eeb-4cdb-43e7-a34f-36868326b8cb"
  const thumbnailURL = "https://vz-a2adf92d-b24.b-cdn.net/e2280eeb-4cdb-43e7-a34f-36868326b8cb/thumbnail.jpg";
  const liveURL = props.url;


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
  }, [videoId, liveURL, thumbnailURL]);


  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
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
  

    // p.ready(function() {
    //   p.tech_.off('dblclick');
    //   p.tech_.off('click');
    // });


    // p.on('click', function(evt) { 
    //   if (evt.target.tagName === 'VIDEO') {
    //     p.pause()
    //   }
    // });


    // p.on('touchstart', function(evt) { 
    //   if (evt.target.tagName === 'VIDEO') {
    //     p.pause()
    //   }
    // });

    setPlayer(p);
    //7.15.4

    return () => {
      if (player) player.dispose();
    };
  }, []);

  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);

  return (
    <Card>
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
        data-setup='{"fluid": true}'
      />
    </Card>
  );
}

export default VideoPlayerMain;
