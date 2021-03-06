import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = props => {
  const {
    className,
    children,
    isAuthenticated,
    user,
    isSiteOwner,
    cannonical
  } = props;
  const headerType = props.headerType || 'default';
  const title = props.title || 'Marcin Cholewka';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="My name is Marcin Cholewka and I am an junior software
                  engineer and freelance developer."
        />
        <meta
          name="keywords"
          content="cholewka portfolio, cholewka developer, cholewka programming, cholewka katowice, cholewka javascript"
        />

        <meta
          property="og:title"
          content="Marcin Cholewka - software engineer, developer, bloger"
        />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="My name is Marcin Cholewka and I am an junior software
                  engineer and freelance developer."
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
          rel="stylesheet"
        />
        {cannonical && (
          <link
            rel="cannonical"
            href={`${process.env.BASE_URL}${cannonical}`}
          />
        )}
        <link rel="icon" type="image.ico" href="/static/favicon.ico" />
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
          isSiteOwner={isSiteOwner}
          user={user}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
