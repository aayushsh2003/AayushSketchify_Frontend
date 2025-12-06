// import { useState, useEffect, useCallback } from 'react';
// import { Upload, Image as ImageIcon, Loader2, CheckCircle, Sparkles, Zap, Shield, Download, Heart, Palette, TrendingUp, Users, Star, Brain, Camera, Wand2, MessageCircle, Send, Linkedin, Facebook, Mail } from 'lucide-react';

// const QUOTES = [
//   { text: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
//   { text: "Art enables us to find ourselves and lose ourselves at the same time.", author: "Thomas Merton" },
//   { text: "Creativity takes courage.", author: "Henri Matisse" },
//   { text: "The purpose of art is washing the dust of daily life off our souls.", author: "Pablo Picasso" },
//   { text: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
//   { text: "Every child is an artist. The problem is how to remain an artist once we grow up.", author: "Pablo Picasso" },
//   { text: "The artist sees what others only catch a glimpse of.", author: "Leonardo da Vinci" },
//   { text: "Art should comfort the disturbed and disturb the comfortable.", author: "Banksy" },
//   { text: "To practice any art, no matter how well or badly, is a way to make your soul grow.", author: "Kurt Vonnegut" },
//   { text: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" },
// ];

// function App() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [sketchUrl, setSketchUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [currentQuote, setCurrentQuote] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const processFile = useCallback((file: File) => {
//     if (!file.type.startsWith('image/')) {
//       setError('Please select a valid image file');
//       return;
//     }

//     setSelectedFile(file);
//     setSketchUrl(null);
//     setError(null);
//     setShowSuccess(false);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewUrl(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       processFile(file);
//     }
//   };

//   const handleDragEnter = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       processFile(file);
//     }
//   };

//   const handleConvert = async () => {
//     if (!selectedFile) {
//       setError('Please select an image first');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSketchUrl(null);
//     setShowSuccess(false);

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       const response = await fetch('http://127.0.0.1:8000/convert', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setSketchUrl(url);
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 5000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to convert image');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (!sketchUrl) return;

//     const link = document.createElement('a');
//     link.href = sketchUrl;
//     link.download = `sketch-${Date.now()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const shareMessage = "Check out my amazing AI-generated sketch from AayushSketchify! Transform your photos into beautiful artistic masterpieces.";

//   const downloadImageAsFile = async (url: string): Promise<File> => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new File([blob], `sketch-${Date.now()}.png`, { type: 'image/png' });
//   };

//   const shareToWhatsApp = async () => {
//     if (!sketchUrl) return;

//     try {
//       if (navigator.share && navigator.canShare) {
//         const file = await downloadImageAsFile(sketchUrl);
//         const shareData = {
//           text: shareMessage,
//           files: [file]
//         };

//         if (navigator.canShare(shareData)) {
//           await navigator.share(shareData);
//           return;
//         }
//       }
//     } catch (err) {
//       console.log('Native share failed, using fallback');
//     }

//     const text = encodeURIComponent(shareMessage + "\n\nDownload your sketch and share it!");
//     window.open(`https://wa.me/?text=${text}`, '_blank');
//     handleDownload();
//   };

//   const shareToTwitter = async () => {
//     if (!sketchUrl) return;

//     try {
//       if (navigator.share && navigator.canShare) {
//         const file = await downloadImageAsFile(sketchUrl);
//         const shareData = {
//           text: shareMessage,
//           files: [file]
//         };

//         if (navigator.canShare(shareData)) {
//           await navigator.share(shareData);
//           return;
//         }
//       }
//     } catch (err) {
//       console.log('Native share failed, using fallback');
//     }

//     const text = encodeURIComponent(shareMessage);
//     window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
//     handleDownload();
//   };

//   const shareToFacebook = async () => {
//     if (!sketchUrl) return;

//     try {
//       if (navigator.share && navigator.canShare) {
//         const file = await downloadImageAsFile(sketchUrl);
//         const shareData = {
//           text: shareMessage,
//           files: [file]
//         };

//         if (navigator.canShare(shareData)) {
//           await navigator.share(shareData);
//           return;
//         }
//       }
//     } catch (err) {
//       console.log('Native share failed, using fallback');
//     }

//     window.open(`https://www.facebook.com/sharer/sharer.php`, '_blank');
//     handleDownload();
//   };

//   const shareToLinkedIn = async () => {
//     if (!sketchUrl) return;

//     try {
//       if (navigator.share && navigator.canShare) {
//         const file = await downloadImageAsFile(sketchUrl);
//         const shareData = {
//           text: shareMessage,
//           files: [file]
//         };

//         if (navigator.canShare(shareData)) {
//           await navigator.share(shareData);
//           return;
//         }
//       }
//     } catch (err) {
//       console.log('Native share failed, using fallback');
//     }

//     window.open(`https://www.linkedin.com/sharing/share-offsite/`, '_blank');
//     handleDownload();
//   };

//   const shareToEmail = async () => {
//     if (!sketchUrl) return;

//     const subject = encodeURIComponent("Check Out My Amazing AI Art Sketch!");
//     const body = encodeURIComponent(shareMessage);
//     window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
//     handleDownload();
//   };

//   const handleReset = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     setSketchUrl(null);
//     setError(null);
//     setShowSuccess(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10">
//         <header className="pt-8 px-4 sm:pt-12">
//           <div className="max-w-6xl mx-auto text-center mb-8">
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
//                 <Wand2 className="w-8 h-8 text-white" />
//               </div>
//               <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-100 px-4 py-2 rounded-full">AI-Powered Art</span>
//             </div>
//             <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
//               Transform Photos into Art
//             </h1>
//             <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
//               Unleash your creativity with AI-powered sketch conversion. Turn ordinary moments into extraordinary artistic expressions.
//             </p>

//             <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
//               <div className="flex items-start gap-3 mb-3">
//                 <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
//                 <p className="text-lg italic leading-relaxed">
//                   "{QUOTES[currentQuote].text}"
//                 </p>
//               </div>
//               <p className="text-right text-blue-100 font-semibold">
//                 — {QUOTES[currentQuote].author}
//               </p>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-6xl mx-auto px-4 py-8">
//           <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 backdrop-blur-sm">
//             <div className="p-8 sm:p-12">
//               {error && (
//                 <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 text-red-800 px-6 py-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg">
//                   <div className="text-2xl">⚠️</div>
//                   <div>
//                     <p className="font-bold">Conversion Error</p>
//                     <p className="text-sm mt-1">{error}</p>
//                   </div>
//                 </div>
//               )}

//               {showSuccess && (
//                 <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 text-green-800 px-6 py-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg">
//                   <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-bold">Conversion Complete</p>
//                     <p className="text-sm mt-1">Your masterpiece is ready! Download or share below.</p>
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-8">
//                 {!previewUrl ? (
//                   <div
//                     onDragEnter={handleDragEnter}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                   >
//                     <label htmlFor="file-upload" className="block">
//                       <div className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-300 cursor-pointer group ${
//                         isDragging
//                           ? 'border-blue-600 bg-blue-100 scale-105'
//                           : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
//                       }`}>
//                         <div className="flex justify-center mb-6">
//                           <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl">
//                             <Upload className="w-14 h-14 text-white" />
//                           </div>
//                         </div>
//                         <p className="text-3xl font-bold text-gray-800 mb-3">
//                           {isDragging ? 'Drop Your Photo Here' : 'Upload Your Photo'}
//                         </p>
//                         <p className="text-xl text-gray-600 mb-6">
//                           Drag and drop or click to browse
//                         </p>
//                         <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
//                           <Camera className="w-5 h-5" />
//                           <p className="text-lg">
//                             JPG, PNG, WebP, and more
//                           </p>
//                         </div>
//                       </div>
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileSelect}
//                       className="hidden"
//                       id="file-upload"
//                     />
//                   </div>
//                 ) : (
//                   <div className="space-y-6">
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-xl transform hover:scale-105 transition-all duration-300">
//                         <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4 border-b-2 border-gray-300">
//                           <p className="text-sm font-bold text-white flex items-center gap-2">
//                             <ImageIcon className="w-5 h-5" />
//                             Original Image
//                           </p>
//                         </div>
//                         <div className="p-6 bg-white aspect-square flex items-center justify-center">
//                           <img
//                             src={previewUrl}
//                             alt="Preview"
//                             className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
//                           />
//                         </div>
//                       </div>

//                       {sketchUrl && (
//                         <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-xl animate-in fade-in zoom-in transform hover:scale-105 transition-all duration-300">
//                           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 border-b-2 border-blue-300">
//                             <p className="text-sm font-bold text-white flex items-center gap-2">
//                               <Sparkles className="w-5 h-5" />
//                               Your Artistic Sketch
//                             </p>
//                           </div>
//                           <div className="p-6 bg-white aspect-square flex items-center justify-center">
//                             <img
//                               src={sketchUrl}
//                               alt="Sketch result"
//                               className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       {!sketchUrl ? (
//                         <div className="flex flex-col sm:flex-row gap-4">
//                           <button
//                             onClick={handleConvert}
//                             disabled={isLoading}
//                             className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 disabled:from-blue-400 disabled:to-cyan-400 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl disabled:shadow-md transform hover:-translate-y-1 disabled:translate-y-0 text-lg"
//                           >
//                             {isLoading ? (
//                               <>
//                                 <Loader2 className="w-6 h-6 animate-spin" />
//                                 Converting to Art...
//                               </>
//                             ) : (
//                               <>
//                                 <Wand2 className="w-6 h-6" />
//                                 Convert to Sketch
//                               </>
//                             )}
//                           </button>
//                           <button
//                             onClick={handleReset}
//                             disabled={isLoading}
//                             className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-bold py-5 px-8 rounded-2xl transition-all duration-300 disabled:text-gray-400 text-lg"
//                           >
//                             Upload Another
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="flex flex-col sm:flex-row gap-4">
//                             <button
//                               onClick={handleDownload}
//                               className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
//                             >
//                               <Download className="w-6 h-6" />
//                               Download Sketch
//                             </button>
//                             <button
//                               onClick={handleReset}
//                               className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-5 px-8 rounded-2xl transition-all duration-300 text-lg"
//                             >
//                               New Sketch
//                             </button>
//                           </div>

//                           <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
//                             <p className="text-center font-bold text-gray-800 mb-4 text-lg">Share Your Masterpiece</p>
//                             <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//                               <button
//                                 onClick={shareToWhatsApp}
//                                 className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                               >
//                                 <MessageCircle className="w-6 h-6" />
//                                 <span className="text-sm">WhatsApp</span>
//                               </button>

//                               <button
//                                 onClick={shareToTwitter}
//                                 className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                               >
//                                 <Send className="w-6 h-6" />
//                                 <span className="text-sm">Twitter</span>
//                               </button>

//                               <button
//                                 onClick={shareToFacebook}
//                                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                               >
//                                 <Facebook className="w-6 h-6" />
//                                 <span className="text-sm">Facebook</span>
//                               </button>

//                               <button
//                                 onClick={shareToLinkedIn}
//                                 className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                               >
//                                 <Linkedin className="w-6 h-6" />
//                                 <span className="text-sm">LinkedIn</span>
//                               </button>

//                               <button
//                                 onClick={shareToEmail}
//                                 className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//                               >
//                                 <Mail className="w-6 h-6" />
//                                 <span className="text-sm">Email</span>
//                               </button>
//                             </div>
//                             <p className="text-center text-sm text-gray-600 mt-4">
//                               Image will be downloaded and shared with your message
//                             </p>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <section className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-3xl p-12 shadow-2xl">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl font-bold mb-4">How AayushSketchify Makes You Better</h2>
//               <p className="text-xl text-blue-100 max-w-3xl mx-auto">
//                 Transform not just your photos, but your creative journey
//               </p>
//             </div>
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
//                 <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
//                   <Brain className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl mb-3">Enhance Creativity</h3>
//                 <p className="text-blue-100 leading-relaxed">
//                   Develop your artistic eye by seeing photos through a new lens. Train your brain to recognize artistic patterns and compositions.
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
//                 <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
//                   <Palette className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl mb-3">Express Yourself</h3>
//                 <p className="text-blue-100 leading-relaxed">
//                   Create unique artistic expressions that reflect your vision. Share your perspective in ways words cannot capture.
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
//                 <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
//                   <TrendingUp className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl mb-3">Grow Your Skills</h3>
//                 <p className="text-blue-100 leading-relaxed">
//                   Learn composition, lighting, and artistic principles through experimentation. Every conversion teaches something new.
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
//                 <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
//                   <Heart className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl mb-3">Build Confidence</h3>
//                 <p className="text-blue-100 leading-relaxed">
//                   Create professional-quality art instantly. Share your work with pride and inspire others with your creations.
//                 </p>
//               </div>
//             </div>
//           </section>

//           <div className="grid md:grid-cols-3 gap-8 mt-16">
//             <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
//                   <Zap className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-800">Lightning Fast</h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed">
//                 Convert photos to stunning sketches in seconds with our optimized AI engine. No waiting, instant results every time.
//               </p>
//             </div>

//             <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
//                   <Star className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-800">Premium Quality</h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed">
//                 Get high-resolution sketches with remarkable artistic detail and precision. Professional-grade results guaranteed.
//               </p>
//             </div>

//             <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
//                   <Shield className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-800">Secure & Private</h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed">
//                 Your images are processed securely and never stored on our servers. Complete privacy and data protection guaranteed.
//               </p>
//             </div>
//           </div>

//           <section className="mt-16 bg-white rounded-3xl p-12 border-2 border-blue-100 shadow-xl">
//             <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">How It Works</h2>
//             <div className="grid md:grid-cols-3 gap-10">
//               <div className="flex flex-col items-center text-center group">
//                 <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-3xl w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">1</div>
//                 <h3 className="font-bold text-xl text-gray-800 mb-3">Upload Your Image</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Drag and drop or click to select your photo. We support all major image formats for your convenience.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center text-center group">
//                 <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-3xl w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">2</div>
//                 <h3 className="font-bold text-xl text-gray-800 mb-3">AI Magic Happens</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Our advanced AI analyzes your photo and transforms it into a beautiful artistic sketch with incredible detail.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center text-center group">
//                 <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-3xl w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">3</div>
//                 <h3 className="font-bold text-xl text-gray-800 mb-3">Download & Share</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Get your beautiful sketch instantly. Download it or share your masterpiece with friends and family.
//                 </p>
//               </div>
//             </div>
//           </section>
//         </main>

//         <footer className="mt-20 px-4 py-12 border-t-2 border-blue-200 bg-white/50 backdrop-blur-sm">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-8">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
//                   <Wand2 className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                   AayushSketchify
//                 </span>
//               </div>
//               <p className="text-gray-600 text-lg mb-6">
//                 Transform your photos into artistic masterpieces with AI
//               </p>
//             </div>
//             {/* <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
//               <a href="#" className="hover:text-blue-600 transition-colors font-semibold">About Us</a>
//               <a href="#" className="hover:text-blue-600 transition-colors font-semibold">Privacy Policy</a>
//               <a href="#" className="hover:text-blue-600 transition-colors font-semibold">Terms of Service</a>
//               <a href="#" className="hover:text-blue-600 transition-colors font-semibold">Contact</a>
//               <a href="#" className="hover:text-blue-600 transition-colors font-semibold">FAQ</a>
//             </div> */}
//             <div className="text-center mt-8 text-gray-500">
//               <p>© 2025 AayushSketchify. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </div>

//       <style>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;



import { useState, useEffect, useCallback } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle, Sparkles, Zap, Shield, Download, Heart, Palette, TrendingUp, Users, Star, Brain, Camera, Wand2, MessageCircle, Send, Linkedin, Facebook, Mail } from 'lucide-react';

const QUOTES = [
  { text: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
  { text: "Art enables us to find ourselves and lose ourselves at the same time.", author: "Thomas Merton" },
  { text: "Creativity takes courage.", author: "Henri Matisse" },
  { text: "The purpose of art is washing the dust of daily life off our souls.", author: "Pablo Picasso" },
  { text: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
  { text: "Every child is an artist. The problem is how to remain an artist once we grow up.", author: "Pablo Picasso" },
  { text: "The artist sees what others only catch a glimpse of.", author: "Leonardo da Vinci" },
  { text: "Art should comfort the disturbed and disturb the comfortable.", author: "Banksy" },
  { text: "To practice any art, no matter how well or badly, is a way to make your soul grow.", author: "Kurt Vonnegut" },
  { text: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" },
];

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sketchUrl, setSketchUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setSelectedFile(file);
    setSketchUrl(null);
    setError(null);
    setShowSuccess(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSketchUrl(null);
    setShowSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('https://aayushsketchify-backend.onrender.com/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setSketchUrl(url);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!sketchUrl) return;

    const link = document.createElement('a');
    link.href = sketchUrl;
    link.download = `sketch-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareMessage = "I just created this amazing AI-generated sketch using AayushSketchify! Transform your photos into beautiful artistic masterpieces instantly. 🎨✨\n\nAayushSketchify Features:\n• Lightning-fast AI conversion\n• Premium quality sketches\n• Secure & private - no data stored\n• Free to use\n\nTry it now and unleash your creativity!";

  const downloadImageAsFile = async (url: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `sketch-${Date.now()}.png`, { type: 'image/png' });
  };

  const shareToWhatsApp = async () => {
    if (!sketchUrl) return;

    try {
      if (navigator.share && navigator.canShare) {
        const file = await downloadImageAsFile(sketchUrl);
        const shareData = {
          text: shareMessage,
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (err) {
      console.log('Native share failed, using fallback');
    }

    const text = encodeURIComponent(shareMessage + "\n\nDownload your sketch and share it!");
    window.open(`https://wa.me/?text=${text}`, '_blank');
    handleDownload();
  };

  const shareToTwitter = async () => {
    if (!sketchUrl) return;

    try {
      if (navigator.share && navigator.canShare) {
        const file = await downloadImageAsFile(sketchUrl);
        const shareData = {
          text: shareMessage,
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (err) {
      console.log('Native share failed, using fallback');
    }

    const text = encodeURIComponent(shareMessage);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    handleDownload();
  };

  const shareToFacebook = async () => {
    if (!sketchUrl) return;

    try {
      if (navigator.share && navigator.canShare) {
        const file = await downloadImageAsFile(sketchUrl);
        const shareData = {
          text: shareMessage,
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (err) {
      console.log('Native share failed, using fallback');
    }

    window.open(`https://www.facebook.com/sharer/sharer.php`, '_blank');
    handleDownload();
  };

  const shareToLinkedIn = async () => {
    if (!sketchUrl) return;

    try {
      if (navigator.share && navigator.canShare) {
        const file = await downloadImageAsFile(sketchUrl);
        const shareData = {
          text: shareMessage,
          files: [file]
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (err) {
      console.log('Native share failed, using fallback');
    }

    window.open(`https://www.linkedin.com/sharing/share-offsite/`, '_blank');
    handleDownload();
  };

  const shareToEmail = async () => {
    if (!sketchUrl) return;

    const subject = encodeURIComponent("Check Out My Amazing AI Art Sketch!");
    const body = encodeURIComponent(shareMessage);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    handleDownload();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSketchUrl(null);
    setError(null);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <header className="pt-8 px-4 sm:pt-12">
          <div className="max-w-6xl mx-auto text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-100 px-4 py-2 rounded-full">AI-Powered Art</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
              Transform Photos into Art
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Unleash your creativity with AI-powered sketch conversion. Turn ordinary moments into extraordinary artistic expressions.
            </p>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
                <p className="text-lg italic leading-relaxed">
                  "{QUOTES[currentQuote].text}"
                </p>
              </div>
              <p className="text-right text-blue-100 font-semibold">
                — {QUOTES[currentQuote].author}
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 backdrop-blur-sm">
            <div className="p-8 sm:p-12">
              {error && (
                <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 text-red-800 px-6 py-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <p className="font-bold">Conversion Error</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {showSuccess && (
                <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 text-green-800 px-6 py-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg">
                  <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Conversion Complete</p>
                    <p className="text-sm mt-1">Your masterpiece is ready! Download or share below.</p>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {!previewUrl ? (
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label htmlFor="file-upload" className="block">
                      <div className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-300 cursor-pointer group ${
                        isDragging
                          ? 'border-blue-600 bg-blue-100 scale-105'
                          : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}>
                        <div className="flex justify-center mb-6">
                          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Upload className="w-14 h-14 text-white" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-3">
                          {isDragging ? 'Drop Your Photo Here' : 'Upload Your Photo'}
                        </p>
                        <p className="text-xl text-gray-600 mb-6">
                          Drag and drop or click to browse
                        </p>
                        <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                          <Camera className="w-5 h-5" />
                          <p className="text-lg">
                            JPG, PNG, WebP, and more
                          </p>
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-xl transform hover:scale-105 transition-all duration-300">
                        <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4 border-b-2 border-gray-300">
                          <p className="text-sm font-bold text-white flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Original Image
                          </p>
                        </div>
                        <div className="p-6 bg-white aspect-square flex items-center justify-center">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                          />
                        </div>
                      </div>

                      {sketchUrl && (
                        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-xl animate-in fade-in zoom-in transform hover:scale-105 transition-all duration-300">
                          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 border-b-2 border-blue-300">
                            <p className="text-sm font-bold text-white flex items-center gap-2">
                              <Sparkles className="w-5 h-5" />
                              Your Artistic Sketch
                            </p>
                          </div>
                          <div className="p-6 bg-white aspect-square flex items-center justify-center">
                            <img
                              src={sketchUrl}
                              alt="Sketch result"
                              className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {!sketchUrl ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            onClick={handleConvert}
                            disabled={isLoading}
                            className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 disabled:from-blue-400 disabled:to-cyan-400 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl disabled:shadow-md transform hover:-translate-y-1 disabled:translate-y-0 text-lg"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Converting to Art...
                              </>
                            ) : (
                              <>
                                <Wand2 className="w-6 h-6" />
                                Convert to Sketch
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleReset}
                            disabled={isLoading}
                            className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-bold py-5 px-8 rounded-2xl transition-all duration-300 disabled:text-gray-400 text-lg"
                          >
                            Upload Another
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button
                              onClick={handleDownload}
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                            >
                              <Download className="w-6 h-6" />
                              Download Sketch
                            </button>
                            <button
                              onClick={handleReset}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-5 px-8 rounded-2xl transition-all duration-300 text-lg"
                            >
                              New Sketch
                            </button>
                          </div>

                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                            <p className="text-center font-bold text-gray-800 mb-4 text-lg">Share Your Masterpiece</p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                              <button
                                onClick={shareToWhatsApp}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                              >
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-sm">WhatsApp</span>
                              </button>

                              <button
                                onClick={shareToTwitter}
                                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                              >
                                <Send className="w-6 h-6" />
                                <span className="text-sm">Twitter</span>
                              </button>

                              <button
                                onClick={shareToFacebook}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                              >
                                <Facebook className="w-6 h-6" />
                                <span className="text-sm">Facebook</span>
                              </button>

                              <button
                                onClick={shareToLinkedIn}
                                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                              >
                                <Linkedin className="w-6 h-6" />
                                <span className="text-sm">LinkedIn</span>
                              </button>

                              <button
                                onClick={shareToEmail}
                                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                              >
                                <Mail className="w-6 h-6" />
                                <span className="text-sm">Email</span>
                              </button>
                            </div>
                            <p className="text-center text-sm text-gray-600 mt-4">
                              Image will be downloaded and shared with your message
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How AayushSketchify Makes You Better</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Transform not just your photos, but your creative journey
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Enhance Creativity</h3>
                <p className="text-blue-100 leading-relaxed">
                  Develop your artistic eye by seeing photos through a new lens. Train your brain to recognize artistic patterns and compositions.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Express Yourself</h3>
                <p className="text-blue-100 leading-relaxed">
                  Create unique artistic expressions that reflect your vision. Share your perspective in ways words cannot capture.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Grow Your Skills</h3>
                <p className="text-blue-100 leading-relaxed">
                  Learn composition, lighting, and artistic principles through experimentation. Every conversion teaches something new.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Build Confidence</h3>
                <p className="text-blue-100 leading-relaxed">
                  Create professional-quality art instantly. Share your work with pride and inspire others with your creations.
                </p>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">Lightning Fast</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Convert photos to stunning sketches in seconds with our optimized AI engine. No waiting, instant results every time.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">Premium Quality</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Get high-resolution sketches with remarkable artistic detail and precision. Professional-grade results guaranteed.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">Secure & Private</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your images are processed securely and never stored on our servers. Complete privacy and data protection guaranteed.
              </p>
            </div>
          </div>

          <section className="mt-16 bg-white rounded-3xl p-12 border-2 border-blue-100 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-3xl w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">1</div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Upload Your Image</h3>
                <p className="text-gray-600 leading-relaxed">
                  Drag and drop or click to select your photo. We support all major image formats for your convenience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-3xl w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">2</div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">AI Magic Happens</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI analyzes your photo and transforms it into a beautiful artistic sketch with incredible detail.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-3xl w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">3</div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Download & Share</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get your beautiful sketch instantly. Download it or share your masterpiece with friends and family.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-20 px-4 py-12 border-t-2 border-blue-200 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  AayushSketchify
                </span>
              </div>
              <p className="text-gray-600 text-lg mb-6">
                Transform your photos into artistic masterpieces with AI
              </p>
            </div>
            <div className="text-center mt-8 text-gray-500">
              <p>© 2025 AayushSketchify. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;