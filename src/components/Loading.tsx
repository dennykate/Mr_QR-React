import LoadingVideo from "../assets/loading.mp4";

interface PropsType {
  height?: string;
}

const Loading = ({ height }: PropsType) => {
  return (
    <div
      style={{
        width: "100%",
        height: height ?? "100vh",
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
