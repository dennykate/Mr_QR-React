import React from "react";
import ImageUploading from "react-images-uploading";

export function Test() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div
      className="App"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="">
            <button
              style={{
                width: 300,
                height: 300,
                border: "red 1px solid",
                borderRadius: 150,
              }}
              onClick={onImageUpload}
              {...dragProps}
            ></button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
