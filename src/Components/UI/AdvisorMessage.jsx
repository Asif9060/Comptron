import { useEffect, useRef } from "react";
import Advisor from "../../assets/images/pooto/M. Raihan.jpg";
const AdvisorMessage = () => {
  const typingTextRef = useRef(null);
  const hasTypedRef = useRef(false); // Prevent multiple typing sessions

  useEffect(() => {
    const text = `Comptron, established in 2018 under the leadership of 12 esteemed Comptron Councilors, serves as a distinguished platform for students passionate about technology, competitive programming, research, artificial intelligence, and advanced engineering. Guided by our motto, “Creativity Assembled,” the club fosters an intellectually stimulating environment that promotes critical thinking, interdisciplinary collaboration, and technological innovation.

At the core of Comptron lies the development of problem-solving abilities, computational efficiency, and research-driven innovation. A key focus is competitive programming, where members undergo rigorous training in algorithmic problem-solving, data structures, computational theory, and optimization techniques. Through structured workshops and participation in ICPC, Codeforces, Hackerrank, AtCoder, and Google Kick Start, students sharpen their analytical and technical skills, preparing for global academic and industry challenges.

Beyond programming, Comptron is committed to cutting-edge research and emerging technologies, including artificial intelligence, machine learning, cybersecurity, quantum computing, cryptography, and software engineering. We encourage students to engage in scholarly research, contribute to open-source projects, and collaborate with faculty and industry experts, ensuring meaningful contributions to technological advancements.

We invite all aspiring programmers, researchers, and technology enthusiasts to join this dynamic community. Through collaborative research, technical competitions, and innovation-driven initiatives, our members contribute meaningfully to the evolving landscape of computing and engineering.

Join Comptron, where creativity is assembled, knowledge is expanded, and groundbreaking ideas take shape, paving the way for a smarter and more innovative future.

M. Raihan
Assistant Professor
Department of Computer Science and Engineering
North Western University
Khulna, Bangladesh

Office Address:
PABX: +880-2477-730596 Ext: 105
Phone: +880-1714070902, +880-1841724707
E-mail: rianku11@gmail.com , mraihan@nwu.ac.bd`;

    let index = 0;
    const speed = 8;

    const typeWriter = () => {
      const element = typingTextRef.current;
      if (!element) return;

      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    };

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTypedRef.current) {
          hasTypedRef.current = true;
          if (typingTextRef.current) typingTextRef.current.textContent = "";
          typeWriter();
          observerInstance.disconnect(); // Stop observing
        }
      },
      { threshold: 0.5 }
    );

    if (typingTextRef.current) {
      observer.observe(typingTextRef.current);
    }

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#1C1C1C] min-h-screen flex items-center justify-center p-6 pt-50">
      <div className="bg-[#1C1C1C] max-w-7xl w-full rounded-lg shadow-xl border-t-4 border-[#15A6E1] p-6">
        <div className="bg-[#15A6E1] text-white text-center text-lg font-semibold rounded-t-md -mt-6 -mx-6 mb-6 py-3">
          Message From Advisor
        </div>

        <div className="w-[280px] h-[320px] mx-auto mb-6 overflow-hidden rounded">
          <img
            src={Advisor}
            alt="Advisor"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          id="typingText"
          ref={typingTextRef}
          className="type-text text-[#15A6E1] text-base leading-8 text-justify whitespace-pre-wrap"
        ></div>
      </div>
    </div>
  );
};

export default AdvisorMessage;
