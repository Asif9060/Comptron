import { useState, useRef, useCallback, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import "./css/Magazine.css";

const Magazine = () => {
   const [currentPage, setCurrentPage] = useState(0);
   const [isFlipping, setIsFlipping] = useState(false);
   const [showControls, setShowControls] = useState(true);
   const flipBookRef = useRef(null);

   // Magazine configuration
   const magazineConfig = {
      width: 400,
      height: 600,
      size: "stretch",
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
      clickEventForward: true,
      usePortrait: true,
      startZIndex: 0,
      autoSize: true,
      showPageCorners: true,
      disableFlipByClick: false,
      flippingTime: 600,
      useMouseEvents: true,
      swipeDistance: 30,
      startPage: 0,
      drawShadow: true,
      startPageIndex: currentPage,
   };

   // Sample magazine content
   const magazinePages = [
      {
         id: "cover",
         type: "cover",
         title: "COMPTRON MAGAZINE",
         subtitle: "Digital Innovation & Technology",
         issue: "Issue #1 - 2025",
         image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop",
      },
      {
         id: "page1",
         type: "content",
         title: "Welcome to the Future",
         content: `
                <h2>Welcome to Comptron Magazine</h2>
                <p>In this digital age, technology continues to evolve at an unprecedented pace. Our magazine brings you the latest insights, innovations, and trends that are shaping the future of computing and digital transformation.</p>
                <p>From artificial intelligence to quantum computing, from blockchain to augmented reality, we explore the technologies that will define tomorrow's world.</p>
                <blockquote>"The future belongs to those who understand technology and use it to create positive change."</blockquote>
            `,
         image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      },
      {
         id: "page2",
         type: "content",
         title: "AI Revolution",
         content: `
                <h2>The AI Revolution is Here</h2>
                <p>Artificial Intelligence is transforming every industry, from healthcare to finance, from education to entertainment. Machine learning algorithms are becoming more sophisticated, enabling computers to perform tasks that were once thought to be exclusively human.</p>
                <p>Natural language processing, computer vision, and deep learning are pushing the boundaries of what's possible.</p>
                <ul>
                    <li>Machine Learning Applications</li>
                    <li>Neural Network Architectures</li>
                    <li>AI Ethics and Responsibility</li>
                    <li>Future of Human-AI Collaboration</li>
                </ul>
            `,
         image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      },
      {
         id: "page3",
         type: "content",
         title: "Quantum Computing",
         content: `
                <h2>Quantum Leap Forward</h2>
                <p>Quantum computing represents a fundamental shift in how we process information. By harnessing the principles of quantum mechanics, these computers can solve complex problems exponentially faster than classical computers.</p>
                <p>Major breakthroughs in quantum error correction and qubit stability are bringing us closer to practical quantum applications.</p>
                <div class="highlight-box">
                    <h3>Key Applications</h3>
                    <p>Cryptography, Drug Discovery, Financial Modeling, Climate Simulation</p>
                </div>
            `,
         image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      },
      {
         id: "page4",
         type: "content",
         title: "Blockchain & Web3",
         content: `
                <h2>Decentralized Future</h2>
                <p>Blockchain technology is revolutionizing how we think about trust, ownership, and digital interactions. From cryptocurrencies to smart contracts, from NFTs to decentralized finance (DeFi), blockchain is creating new paradigms for digital economies.</p>
                <p>Web3 represents the next evolution of the internet, where users have true ownership of their data and digital assets.</p>
                <p>The potential applications span across supply chain management, voting systems, identity verification, and much more.</p>
            `,
         image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      },
      {
         id: "page5",
         type: "content",
         title: "Virtual Reality",
         content: `
                <h2>Immersive Experiences</h2>
                <p>Virtual and Augmented Reality technologies are creating unprecedented opportunities for immersive experiences. From gaming and entertainment to education and training, VR/AR is transforming how we interact with digital content.</p>
                <p>The metaverse concept is gaining traction, promising virtual worlds where people can work, play, and socialize in entirely new ways.</p>
                <div class="tech-stats">
                    <div class="stat">
                        <h4>$31.12B</h4>
                        <p>Global VR Market 2023</p>
                    </div>
                    <div class="stat">
                        <h4>171M</h4>
                        <p>VR Users Worldwide</p>
                    </div>
                </div>
            `,
         image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=250&fit=crop",
      },
      {
         id: "back-cover",
         type: "back-cover",
         title: "Thank You",
         content:
            "Thank you for reading Comptron Magazine. Stay connected for more insights into the future of technology.",
         social: ["@comptron_tech", "comptron.tech", "contact@comptron.tech"],
      },
   ];

   // Event handlers
   const onFlip = useCallback(
      (e) => {
         console.log("Page flipped:", e.data);
         setCurrentPage(e.data);
         setIsFlipping(true);
         setTimeout(() => setIsFlipping(false), magazineConfig.flippingTime);
      },
      [magazineConfig.flippingTime]
   );

   const onChangeOrientation = useCallback((e) => {
      console.log("Orientation changed:", e);
      // Handle orientation changes
      if (flipBookRef.current) {
         try {
            const pageFlip = flipBookRef.current.getPageFlip();
            if (pageFlip && typeof pageFlip.updateSize === "function") {
               pageFlip.updateSize();
            }
         } catch (error) {
            console.error("Error updating size on orientation change:", error);
         }
      }
   }, []);

   const onChangeState = useCallback((e) => {
      console.log("State changed:", e);
      // Handle state changes
   }, []);

   // Navigation functions with imperative approach
   const nextPage = useCallback(() => {
      console.log("Next page called, current page:", currentPage);

      // First, update the state
      const nextPageIndex = Math.min(currentPage + 1, magazinePages.length - 1);
      if (nextPageIndex === currentPage) {
         console.log("Already at last page");
         return;
      }

      setCurrentPage(nextPageIndex);

      // Then try to trigger the flipbook animation
      if (flipBookRef.current) {
         setTimeout(() => {
            try {
               const flipBookElement = flipBookRef.current;
               console.log("FlipBook element:", flipBookElement);

               // Try multiple methods to access the pageFlip
               let pageFlip = null;
               if (flipBookElement.getPageFlip) {
                  pageFlip = flipBookElement.getPageFlip();
               } else if (flipBookElement.pageFlip) {
                  pageFlip = flipBookElement.pageFlip;
               }

               if (pageFlip) {
                  console.log("PageFlip instance:", pageFlip);
                  console.log(
                     "Available flip methods:",
                     Object.getOwnPropertyNames(Object.getPrototypeOf(pageFlip)).filter(
                        (name) =>
                           name.includes("flip") ||
                           name.includes("turn") ||
                           name.includes("next")
                     )
                  );

                  if (typeof pageFlip.flipNext === "function") {
                     console.log("Calling flipNext()");
                     pageFlip.flipNext();
                  } else if (typeof pageFlip.nextPage === "function") {
                     console.log("Calling nextPage()");
                     pageFlip.nextPage();
                  } else if (typeof pageFlip.turnToPage === "function") {
                     console.log("Calling turnToPage()");
                     pageFlip.turnToPage(nextPageIndex);
                  } else if (typeof pageFlip.flip === "function") {
                     console.log("Calling flip()");
                     pageFlip.flip(nextPageIndex);
                  }
               }
            } catch (error) {
               console.error("Error triggering flip animation:", error);
            }
         }, 50);
      }
   }, [currentPage, magazinePages.length]);

   const prevPage = useCallback(() => {
      console.log("Previous page called, current page:", currentPage);

      // First, update the state
      const prevPageIndex = Math.max(currentPage - 1, 0);
      if (prevPageIndex === currentPage) {
         console.log("Already at first page");
         return;
      }

      setCurrentPage(prevPageIndex);

      // Then try to trigger the flipbook animation
      if (flipBookRef.current) {
         setTimeout(() => {
            try {
               const flipBookElement = flipBookRef.current;
               console.log("FlipBook element:", flipBookElement);

               // Try multiple methods to access the pageFlip
               let pageFlip = null;
               if (flipBookElement.getPageFlip) {
                  pageFlip = flipBookElement.getPageFlip();
               } else if (flipBookElement.pageFlip) {
                  pageFlip = flipBookElement.pageFlip;
               }

               if (pageFlip) {
                  console.log("PageFlip instance:", pageFlip);
                  console.log(
                     "Available flip methods:",
                     Object.getOwnPropertyNames(Object.getPrototypeOf(pageFlip)).filter(
                        (name) =>
                           name.includes("flip") ||
                           name.includes("turn") ||
                           name.includes("prev")
                     )
                  );

                  if (typeof pageFlip.flipPrev === "function") {
                     console.log("Calling flipPrev()");
                     pageFlip.flipPrev();
                  } else if (typeof pageFlip.prevPage === "function") {
                     console.log("Calling prevPage()");
                     pageFlip.prevPage();
                  } else if (typeof pageFlip.turnToPage === "function") {
                     console.log("Calling turnToPage()");
                     pageFlip.turnToPage(prevPageIndex);
                  } else if (typeof pageFlip.flip === "function") {
                     console.log("Calling flip()");
                     pageFlip.flip(prevPageIndex);
                  }
               }
            } catch (error) {
               console.error("Error triggering flip animation:", error);
            }
         }, 50);
      }
   }, [currentPage]);

   const goToPage = useCallback(
      (pageNumber) => {
         console.log("Go to page called:", pageNumber, "current page:", currentPage);

         if (pageNumber === currentPage) {
            console.log("Already on target page");
            return;
         }

         // First, update the state
         const targetPage = Math.max(0, Math.min(pageNumber, magazinePages.length - 1));
         setCurrentPage(targetPage);

         // Then try to trigger the flipbook animation
         if (flipBookRef.current) {
            setTimeout(() => {
               try {
                  const flipBookElement = flipBookRef.current;
                  console.log("FlipBook element:", flipBookElement);

                  // Try multiple methods to access the pageFlip
                  let pageFlip = null;
                  if (flipBookElement.getPageFlip) {
                     pageFlip = flipBookElement.getPageFlip();
                  } else if (flipBookElement.pageFlip) {
                     pageFlip = flipBookElement.pageFlip;
                  }

                  if (pageFlip) {
                     console.log("PageFlip instance:", pageFlip);
                     console.log(
                        "Available flip methods:",
                        Object.getOwnPropertyNames(
                           Object.getPrototypeOf(pageFlip)
                        ).filter((name) => name.includes("flip") || name.includes("turn"))
                     );

                     if (typeof pageFlip.turnToPage === "function") {
                        console.log("Calling turnToPage():", targetPage);
                        pageFlip.turnToPage(targetPage);
                     } else if (typeof pageFlip.flip === "function") {
                        console.log("Calling flip():", targetPage);
                        pageFlip.flip(targetPage);
                     }
                  }
               } catch (error) {
                  console.error("Error triggering flip animation:", error);
               }
            }, 50);
         }
      },
      [currentPage, magazinePages.length]
   );

   // Auto-hide controls
   useEffect(() => {
      let timer;
      const resetTimer = () => {
         setShowControls(true);
         clearTimeout(timer);
         timer = setTimeout(() => setShowControls(false), 3000);
      };

      const handleMouseMove = () => resetTimer();
      const handleTouchStart = () => resetTimer();

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchstart", handleTouchStart);
      resetTimer();

      return () => {
         document.removeEventListener("mousemove", handleMouseMove);
         document.removeEventListener("touchstart", handleTouchStart);
         clearTimeout(timer);
      };
   }, []);

   // Initialize flipbook and handle resize
   useEffect(() => {
      const initializeFlipbook = () => {
         if (flipBookRef.current) {
            try {
               const flipBookElement = flipBookRef.current;
               console.log("Initializing flipbook:", flipBookElement);

               // Try multiple methods to access the pageFlip
               let pageFlip = null;
               if (flipBookElement.getPageFlip) {
                  pageFlip = flipBookElement.getPageFlip();
               } else if (flipBookElement.pageFlip) {
                  pageFlip = flipBookElement.pageFlip;
               }

               if (pageFlip) {
                  console.log("Flipbook initialized successfully");
                  console.log(
                     "Available methods:",
                     Object.getOwnPropertyNames(Object.getPrototypeOf(pageFlip))
                  );
                  console.log("PageFlip object:", pageFlip);

                  // Update size to ensure proper initialization
                  if (typeof pageFlip.updateSize === "function") {
                     pageFlip.updateSize();
                  }

                  // Set initial page if needed
                  if (typeof pageFlip.turnToPage === "function") {
                     pageFlip.turnToPage(currentPage);
                  } else if (typeof pageFlip.flip === "function") {
                     pageFlip.flip(currentPage);
                  }
               } else {
                  console.warn("Could not access pageFlip instance");
               }
            } catch (error) {
               console.error("Error initializing flipbook:", error);
            }
         }
      };

      // Initialize after a short delay to ensure DOM is ready
      const timer = setTimeout(initializeFlipbook, 500);

      // Handle window resize
      const handleResize = () => {
         if (flipBookRef.current) {
            try {
               const flipBookElement = flipBookRef.current;
               let pageFlip = null;

               if (flipBookElement.getPageFlip) {
                  pageFlip = flipBookElement.getPageFlip();
               } else if (flipBookElement.pageFlip) {
                  pageFlip = flipBookElement.pageFlip;
               }

               if (pageFlip && typeof pageFlip.updateSize === "function") {
                  pageFlip.updateSize();
               }
            } catch (error) {
               console.error("Error updating flipbook size:", error);
            }
         }
      };

      window.addEventListener("resize", handleResize);

      return () => {
         clearTimeout(timer);
         window.removeEventListener("resize", handleResize);
      };
   }, [currentPage]);

   // Debug function for testing navigation
   useEffect(() => {
      // Add global debug functions for testing
      window.debugMagazine = {
         nextPage: () => {
            console.log("Debug: Next page called");
            nextPage();
         },
         prevPage: () => {
            console.log("Debug: Previous page called");
            prevPage();
         },
         goToPage: (page) => {
            console.log("Debug: Go to page", page);
            goToPage(page);
         },
         getCurrentPage: () => currentPage,
         getFlipBookRef: () => flipBookRef.current,
         getPageFlip: () => {
            if (flipBookRef.current) {
               try {
                  return flipBookRef.current.getPageFlip();
               } catch (error) {
                  console.error("Error getting pageFlip:", error);
                  return null;
               }
            }
            return null;
         },
         testFlipMethods: () => {
            if (flipBookRef.current) {
               try {
                  const pageFlip = flipBookRef.current.getPageFlip();
                  if (pageFlip) {
                     console.log(
                        "FlipBook methods:",
                        Object.getOwnPropertyNames(Object.getPrototypeOf(pageFlip))
                     );
                     console.log(
                        "Current page methods:",
                        Object.getOwnPropertyNames(
                           Object.getPrototypeOf(pageFlip)
                        ).filter(
                           (name) => name.includes("page") || name.includes("current")
                        )
                     );
                     console.log(
                        "Navigation methods:",
                        Object.getOwnPropertyNames(
                           Object.getPrototypeOf(pageFlip)
                        ).filter(
                           (name) =>
                              name.includes("flip") ||
                              name.includes("turn") ||
                              name.includes("next") ||
                              name.includes("prev")
                        )
                     );
                  }
               } catch (error) {
                  console.error("Error testing flip methods:", error);
               }
            }
         },
      };

      return () => {
         if (window.debugMagazine) {
            delete window.debugMagazine;
         }
      };
   }, [nextPage, prevPage, goToPage, currentPage]);

   // Render page content
   const renderPageContent = (page) => {
      switch (page.type) {
         case "cover":
            return (
               <div className="page cover-page">
                  <div className="cover-content">
                     <div className="cover-image">
                        <img src={page.image} alt="Cover" />
                        <div className="cover-overlay">
                           <h1 className="magazine-title">{page.title}</h1>
                           <p className="magazine-subtitle">{page.subtitle}</p>
                           <div className="issue-info">{page.issue}</div>
                        </div>
                     </div>
                  </div>
               </div>
            );

         case "content":
            return (
               <div className="page content-page">
                  <div className="page-header">
                     <h1>{page.title}</h1>
                  </div>
                  <div className="page-body">
                     {page.image && (
                        <div className="page-image">
                           <img src={page.image} alt={page.title} />
                        </div>
                     )}
                     <div
                        className="page-text"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                     />
                  </div>
                  <div className="page-footer">
                     <span className="page-number">
                        {magazinePages.indexOf(page) + 1}
                     </span>
                  </div>
               </div>
            );

         case "back-cover":
            return (
               <div className="page back-cover-page">
                  <div className="back-cover-content">
                     <h2>{page.title}</h2>
                     <p>{page.content}</p>
                     <div className="social-links">
                        {page.social.map((link, index) => (
                           <div key={index} className="social-link">
                              {link}
                           </div>
                        ))}
                     </div>
                     <div className="logo">
                        <h3>COMPTRON</h3>
                        <p>Digital Innovation Magazine</p>
                     </div>
                  </div>
               </div>
            );

         default:
            return <div className="page"></div>;
      }
   };

   return (
      <div className="magazine-container">
         {/* Background */}
         <div className="magazine-background"></div>

         {/* Magazine Viewer */}
         <div className="magazine-viewer">
            <HTMLFlipBook
               ref={flipBookRef}
               {...magazineConfig}
               onFlip={onFlip}
               onChangeOrientation={onChangeOrientation}
               onChangeState={onChangeState}
               className="magazine-flipbook">
               {magazinePages.map((page) => (
                  <div key={page.id} className="page-wrapper">
                     {renderPageContent(page)}
                  </div>
               ))}
            </HTMLFlipBook>
         </div>

         {/* Navigation Controls */}
         {/* <div className={`magazine-controls ${showControls ? "visible" : "hidden"}`}>
            <div className="main-controls">
               <div className="control-panel">
                  <button
                     className="nav-btn prev-btn"
                     onClick={(e) => {
                        console.log('Previous button clicked');
                        e.preventDefault();
                        e.stopPropagation();
                        prevPage();
                     }}
                     disabled={currentPage <= 0}
                     aria-label="Previous page">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 16.58L10.83 12l4.58-4.58L14 6l-6 6 6 6z" />
                     </svg>
                  </button>

                  <div className="page-indicator">
                     <span className="current-page">{currentPage + 1}</span>
                     <span className="separator">/</span>
                     <span className="total-pages">{magazinePages.length}</span>
                  </div>

                  <button
                     className="nav-btn next-btn"
                     onClick={(e) => {
                        console.log('Next button clicked');
                        e.preventDefault();
                        e.stopPropagation();
                        nextPage();
                     }}
                     disabled={currentPage >= magazinePages.length - 1}
                     aria-label="Next page">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6-6 6z" />
                     </svg>
                  </button>

                  
                  <div className="control-divider"></div>

                  <button
                     className="nav-btn fullscreen-btn"
                     onClick={() => {
                        if (document.fullscreenElement) {
                           document.exitFullscreen();
                        } else {
                           document.documentElement.requestFullscreen();
                        }
                     }}
                     aria-label="Toggle fullscreen">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                     </svg>
                  </button>
               </div>

              
               <div className="page-thumbnails">
                  {magazinePages.map((page, index) => (
                     <button
                        key={page.id}
                        className={`thumbnail ${index === currentPage ? "active" : ""}`}
                        onClick={(e) => {
                           console.log('Thumbnail clicked:', index);
                           e.preventDefault();
                           e.stopPropagation();
                           goToPage(index);
                        }}
                        aria-label={`Go to page ${index + 1}`}>
                        <div className="thumbnail-content">
                           {page.type === "cover" && <span>C</span>}
                           {page.type === "content" && <span>{index}</span>}
                           {page.type === "back-cover" && <span>B</span>}
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         </div> */}

         {/* Loading indicator */}
         {isFlipping && (
            <div className="flip-indicator">
               <div className="flip-animation"></div>
            </div>
         )}

         {/* Instructions */}
         <div className="magazine-instructions">
            <p>Click on the page corners or use navigation buttons to flip pages</p>
            <p>Drag from page edges for manual page turning</p>
         </div>
      </div>
   );
};

export default Magazine;
