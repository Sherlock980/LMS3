import React from 'react';


function Homepage() {
  return (
    <div className="container mt-5 pt-5">
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <section className="home-top">
            <h1>Blizzard Snowboarding League</h1>
            <p>
              Welcome to the Blizzard Snowboarding League, the ultimate
              destination for snowboarding enthusiasts and adrenaline seekers!
              Our league represents the pinnacle of snowboarding excellence,
              offering an exhilarating mix of competitive and freestyle events
              set against some of the most breathtaking alpine landscapes. At
              Blizzard, we celebrate the spirit of adventure and the thrill of
              conquering snowy terrains. </p>{' '}
              <p>
              Whether you're a seasoned pro aiming
              for the top spot or a newcomer eager to carve your first trail,
              our league provides the perfect platform to showcase your
              skills, push your limits, and connect with a vibrant community
              of fellow snowboarders. </p>{' '}

          </section>

          <section className="home-bottom">
            <h2 className="events-title">Events</h2>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/EzGPmg4fFL8?si=AlYUCCCA1_qgesVS"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/aINlzgrOovI?si=ETR9cnWEqn5VKdk_"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/t705_V-RDcQ?si=Fqu6TV4Kjbirj1jv"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/gbYW0AGMfOY?si=ce5xVBWmFZdIHyhy"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
