"use client";

import React, { useState } from "react";

import Dropzone from "react-dropzone";
import { Center } from "@chakra-ui/react";
import { toast, Bounce } from "react-toastify";
import Image from "next/image";

import Label from "../Label";

import style from "./style.module.css";

export default function UploadCard(props) {
  const [uploadText, setUploadText] = useState("Click or Drop file here");
  const [focusedStyle, setStyle] = useState({});

  return (
    <Dropzone
      multiple={false}
      onDropAccepted={(files) => {
        let file = files[0];
        setUploadText("Click or Drop file here");
        setStyle({
          border: "1px solid #FFFFFF",
        });

        props.setFile(file);

        // if (
        //   file.type === "" &&
        //   file.name.split(".")[file.name.split(".").length - 1] !== "mis"
        // ) {
        //   toast({
        //     description: "Unrecognized file type.",
        //     status: "error",
        //     duration: 9000,
        //     isClosable: true,
        //   });
        // } else {
        //   props.setFile(files[0]);
        // }
      }}
      onDropRejected={() => {
        toast.error("Unable to accept your file. Please try again", {
          position: "top-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
          transition: Bounce,
        });

        setUploadText("Click or Drop file here");
        setStyle({
          border: "1px solid #FFFFFF",
        });
      }}
      onError={(e) => console.log("ERROR", e)}
      onDragEnter={() => {
        setUploadText("Drop the file");
        setStyle({
          border: "1px solid #3182CE",
        });
      }}
      onDragLeave={() => {
        setUploadText("Click or Drop file here");
        setStyle({
          border: "1px solid #FFFFFF",
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={style.uploadArea}
          {...getRootProps()}
          style={focusedStyle}
        >
          <input {...getInputProps()} />
          <Image src="/upload.svg" height={270} width={270} alt="upload" />
          <Center>
            <Label>{uploadText}</Label>
          </Center>
        </div>
      )}
    </Dropzone>
  );
}
