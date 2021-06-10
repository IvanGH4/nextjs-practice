import React from "react";
import Head from "next/head";

function HeadComponent({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Read any post, and add new ones!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadComponent;
