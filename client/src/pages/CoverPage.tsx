import { Link } from "react-router-dom";

import heroIllustration from "../assets/hero-illustration.png";

function CoverPage() {
  return (
    <div className="min-h-screen bg-[#FAF9FB]">
      <main className="flex items-center justify-between gap-12 max-w-5xl mx-auto px-6 py-16 flex-wrap-reverse">
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-4xl leading-tight font-bold text-gray-900">
            Manage your Tasks on{" "}
            <span className="text-[#6C4FF3]">TaskDuty</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <div>
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold
                text-white bg-[#6C4FF3] hover:bg-[#5A3FE0] transition-colors"
            >
              Go to My Tasks
            </Link>
          </div>
        </div>

        <div className="flex-1 min-w-64 max-w-sm">
          <img src={heroIllustration} alt="" className="w-full h-auto" />
        </div>
      </main>
    </div>
  );
}

export default CoverPage;
