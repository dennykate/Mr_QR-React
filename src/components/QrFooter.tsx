import React, { useEffect, useRef, useState } from "react";

interface PropsType {
  getQrData: (page: number) => Promise<void>;
}

const QrFooter = ({ getQrData }: PropsType) => {
  const elementRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          setLoading(true);

          setTimeout(() => {
            getQrData(page)
              .then(() => {
                setLoading(false);
                setPage((prev) => prev + 1);
              })
              .catch(() => setLoading(false));
          }, 1000);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [loading]);

  return (
    <div
      ref={elementRef}
      style={{
        width: "100%",
        height: 160,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <h6 style={{ fontSize: 26 }}>Loading...</h6>}
    </div>
  );
};

export default QrFooter;
