const TheoreticalFramework = () => {
  return (
    <section className="py-20 px-6 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 tracking-tight">
          Theoretical Framework
        </h2>
        <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
          <p>
            This platform is structurally informed by <strong>Dipesh Chakrabarty’s</strong> critique of climate narratives that center the Global North while rendering tropical displacement invisible. It responds to <strong>Stef Craps’s</strong> call for new forms of "climate witnessing" capable of conveying the slow, ongoing violence of ecological change.
          </p>
          <p>
            By synthesizing community testimony in Bangla with high-resolution sea-level projections, this research seeks to bridge the gap between abstract global data and lived experience. It challenges the "digital blackout" by centering the 15 million residents who produce 
            <span className="mx-1 font-semibold text-indigo-600">{"<"}0.5% of global emissions</span> 
            yet face the most immediate threat of displacement.
          </p>
          <div className="pt-4">
            <hr className="w-16 border-t-2 border-indigo-500 mb-4" />
            <p className="text-sm italic text-slate-500">
              This framework aligns the project with EMGS themes of transregional connectivity and epistemic justice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheoreticalFramework;
