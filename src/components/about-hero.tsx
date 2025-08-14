export function AboutHero() {
  return (
    <div className="relative h-[50vh] min-h-[400px] bg-cover bg-center text-white flex items-center justify-center" style={{backgroundImage: "url('https://violet-finch-601645.hostingersite.com/wp-content/uploads/2025/08/5-1.jpg')"}}>
      <div className="absolute inset-0 bg-primary/70"></div>
      <div className="relative z-10 text-center px-4">
        <p className="flex items-center justify-center text-sm font-bold tracking-widest text-white/80 uppercase mb-4">
          <span className="text-lg font-bold text-accent mr-2">•</span>Who We Are
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">About Alpine Tech</h1>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
          Your peak of home comfort, built on over a decade of trust, professionalism, and unwavering quality.
        </p>
      </div>
    </div>
  );
}
