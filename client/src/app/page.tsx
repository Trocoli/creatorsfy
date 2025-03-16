"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";
import { Flex } from "antd";

const Home = () => {
  const { data: session, status } = useSession();

  if (!session && status !== "loading") {
    redirect("/login");
  }
  if (session && session.user) {
    redirect("/dashboard");
  }

  return (
    <Flex
      style={{
        height: "100vh",
        width: "100vw",
        fontSize: "2.5rem",
        backgroundColor: "var(--white)",
        color: "var(--primary-green)",
      }}
      justify="center"
      align="center"
    >
      <h1>Creatorsfy.</h1>
    </Flex>
  );
};

export default Home;
