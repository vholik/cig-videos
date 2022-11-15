import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Header from "../components/Header";
import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";
import Video from "../components/Video";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clagxfn6307ti01tc6taifzx3/master"
);

const QUERY_VIDEOS = gql`
  {
    videos(first: 100) {
      actor {
        name
        image {
          url
        }
      }
      date
      id
      videoName
      views
      image {
        url
      }
    }
  }
`;

const QUERY_ACTORS = gql`
  {
    actors(first: 100) {
      name
      id
      image {
        url
      }
    }
  }
`;

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [currentActor, setCurrentActor] = useState("");
  const [actors, setActors] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  async function fetchVideo() {
    const { videos } = await graphcms.request(QUERY_VIDEOS);
    const { actors } = await graphcms.request(QUERY_ACTORS);
    console.log(actors);
    setVideos(videos);
    setActors(actors);
    if (actors[0].name) {
      setCurrentActor(actors[0].name);
    }
  }

  useEffect(() => {
    fetchVideo();
  }, []);

  useEffect(() => {
    setCurrentVideos(
      videos.filter((video) => video.actor.name === currentActor)
    );
  }, [currentActor]);

  const playVideo = (url) => {
    setModal(true);
    setCurrentVideo(url);
  };

  return (
    <StyledHome>
      <Head>
        <title>Amatorskie</title>
        <meta name="description" content="Amatoryskie strona" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal && <Video currentVideo={currentVideo} setModal={setModal} />}
      <div className="sidebar">
        <h1 className="title">Dziewczyny:</h1>
        {actors.map((actor) => (
          <div
            className="actor"
            key={actor.id}
            onClick={() => setCurrentActor(actor.name)}
          >
            <div className="photo">
              <Image
                src={actor.image.url}
                width={50}
                height={50}
                className="photo"
                alt="Photo"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="actor-name">{actor.name}</p>
          </div>
        ))}
      </div>
      <div className="videos">
        {currentVideos.map((video) => (
          <div className="video" key={video.id}>
            <video
              style={{ width: "350px", height: "200px" }}
              onClick={() => playVideo(video.image.url)}
            >
              <source src={video.image.url} />
            </video>
            <h2 className="name">{video.videoName}</h2>
            <p className="count">{video.views} Wyświetlenia</p>
            <p className="date">Dodano {video.date}</p>
          </div>
        ))}
      </div>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  .videos {
    padding-top: 50px;
    padding-right: 50px;
    padding-left: 350px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    background-color: #0e0e10;
    .video {
      cursor: pointer;
      .cover {
        width: 100%;
        height: 200px;
        background-color: grey;
      }
      .name {
        margin-top: 6px;
        font-size: 18px;
        font-weight: 500;
      }
      .count {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 6px;
      }
      .date {
        font-size: 14px;
        margin-top: 6px;
      }
    }
  }
  .sidebar {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100%;
    top: 89px;
    width: 300px;
    overflow-y: scroll;
    padding: 40px 100px 0 25px;
    background-color: #1f1f23;
    padding-bottom: 120px;
    .title {
      font-weight: 500;
      font-size: 16px;
      text-transform: uppercase;
    }
    .actor {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;
      transition: opacity 0.2s linear;
      .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .actor-name {
        font-size: 18px;
        text-transform: uppercase;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
