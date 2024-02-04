"use client";

import React, { useState } from "react";

import Dropzone from "react-dropzone";
import { Center, useToast } from "@chakra-ui/react";
import Image from "next/image";

import Label from "../Label";

import style from "./style.module.css";

export default function UploadCard(props) {
  const [uploadText, setUploadText] = useState("Click or Drop file here");
  const [focusedStyle, setStyle] = useState({});
  const toast = useToast();

  return (
    <Dropzone
      multiple={false}
      onDropAccepted={(files) => {
        setUploadText("Click or Drop files here");
        setStyle({
          border: "1px solid #FFFFFF",
        });
        props.setFile(files[0]);
      }}
      onDropRejected={() => {
        toast({
          title: "Something went wrong",
          description: "Unable to accept your file. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setUploadText("Click or Drop files here");
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
        setUploadText("Click or Drop files here");
        setStyle({
          border: "1px solid #FFFFFF",
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
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
        </section>
      )}
    </Dropzone>
  );
}
