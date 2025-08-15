export function ContactHero() {
  const videoId = "xZ_Wgu2CtNA";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`;

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <iframe
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.77vh', 
            height: '56.25vw', 
            minWidth: '100%',
            minHeight: '100%',
          }}
          src={youtubeEmbedUrl}
          title="YouTube video player background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="absolute inset-0 bg-primary/70 z-10"></div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-4">
        <p className="flex items-center justify-center text-sm font-bold tracking-widest text-white/80 uppercase mb-4 animate-fade-in-slide [animation-delay:200ms]">
          <span className="text-lg font-bold text-accent mr-2">•</span>
          Contact Us
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 animate-fade-in-slide [animation-delay:400ms]">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-slide [animation-delay:600ms]">
          We're here to answer your questions and help you get started on your next project.
        </p>
      </div>
    </div>
  );
}
