import LoadingVideo from "../assets/loading.mp4";

const Loading = () => {
  return (
    <div
      style={{
        maxWidth: 200,
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        src={LoadingVideo}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
    </div>
  );
};

export default Loading;
