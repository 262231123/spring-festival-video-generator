'use client';

import { useState, useRef } from 'react';
import { VIDEO_STYLES, ART_STYLES, getStyleById, getArtStyleById } from '@/data/styles';

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedArtStyle, setSelectedArtStyle] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const topVideoRef = useRef<HTMLVideoElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }
    
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) {
      alert('请先上传图片并选择风格');
      return;
    }

    setIsGenerating(true);
    setGenerationStatus('正在创建生成任务...');
    setVideoUrl(null);

    try {
      const formData = new FormData();
      formData.append('image', uploadedImage);
      formData.append('styleId', selectedStyle);
      if (selectedArtStyle) {
        formData.append('artStyleId', selectedArtStyle);
      }

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      setTaskId(data.taskId);
      setGenerationStatus('视频生成中，请稍候...');
      
      let status = data.status;
      let currentTaskId = data.taskId;
      
      while (status !== 'succeeded' && status !== 'failed') {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const statusResponse = await fetch(`/api/task-status?taskId=${currentTaskId}`);
        const statusData = await statusResponse.json();
        
        status = statusData.status;
        
        if (status === 'succeeded') {
          setVideoUrl(statusData.videoUrl);
          setGenerationStatus('视频生成成功！');
        } else if (status === 'failed') {
          throw new Error(statusData.error || '生成失败');
        } else if (status === 'running') {
          setGenerationStatus('视频生成中，进度: ' + (statusData.progress || '正在处理'));
        }
      }
    } catch (error: any) {
      console.error('生成失败:', error);
      setGenerationStatus('生成失败: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedStyleData = selectedStyle ? getStyleById(selectedStyle) : null;
  const selectedArtStyleData = selectedArtStyle ? getArtStyleById(selectedArtStyle) : null;

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl animate-[float_3s_ease-in-out_infinite]">🧧</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                春节拜年视频生成器
              </h1>
              <p className="text-slate-400 text-center mt-1">用 AI 生成超酷炫的拜年视频</p>
            </div>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-2 mb-6 slide-up relative">
          <video 
            ref={topVideoRef}
            src="/happynewyear.mp4" 
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
            className="w-full h-[260px] object-cover rounded-2xl"
          />
          <button
            onClick={() => {
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 flex flex-col gap-6">
            <div className="glass-card glass-card-hover p-8 slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl">
                  📸
                </div>
                <h2 className="text-2xl font-bold text-white">上传照片</h2>
              </div>
              
              {!uploadedImagePreview ? (
                <div 
                  className={`upload-zone p-8 text-center cursor-pointer transition-all duration-500 ${dragActive ? 'upload-zone-active' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-5xl mb-3">🖼️</div>
                  <p className="text-slate-300 text-lg font-medium">点击或拖拽上传照片</p>
                  <p className="text-slate-500 text-sm mt-2">支持 JPG、PNG、GIF 格式</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative group mb-6">
                  <img 
                    src={uploadedImagePreview} 
                    alt="上传的照片" 
                    className="w-full h-56 object-cover rounded-2xl"
                  />
                  <button 
                    onClick={() => {
                      setUploadedImage(null);
                      setUploadedImagePreview(null);
                    }}
                    className="absolute top-3 right-3 w-12 h-12 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>
              )}

              {(selectedStyleData || selectedArtStyleData) && (
                <div className="space-y-4 p-6 bg-slate-900/50 rounded-2xl mb-6">
                  {selectedStyleData && (
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">🎬</span>
                      <div>
                        <p className="text-sm text-slate-400">场景</p>
                        <p className="text-white text-lg font-bold">{selectedStyleData.name}</p>
                      </div>
                    </div>
                  )}
                  {selectedArtStyleData && (
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">🎨</span>
                      <div>
                        <p className="text-sm text-slate-400">美术</p>
                        <p className="text-white text-lg font-bold">{selectedArtStyleData.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="relative">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !uploadedImage || !selectedStyle}
                  className={`neon-button w-full flex items-center justify-center gap-3 py-5 text-xl ${isGenerating || !uploadedImage || !selectedStyle ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{generationStatus}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl">🚀</span>
                      <span>生成拜年视频</span>
                    </>
                  )}
                </button>
                {isGenerating && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden rounded-b-2xl">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 via-pink-500 bg-[length:200%_100%] animate-[progress-animate_2s_linear_infinite]"
                    ></div>
                  </div>
                )}
              </div>

              {!isGenerating && !uploadedImage && (
                <p className="text-center text-slate-500 text-sm mt-4">请先上传照片</p>
              )}
              {!isGenerating && uploadedImage && !selectedStyle && (
                <p className="text-center text-slate-500 text-sm mt-4">请选择一个场景风格</p>
              )}
            </div>

            <div className="glass-card glass-card-hover p-8 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                  🎨
                </div>
                <h2 className="text-2xl font-bold text-white">美术风格</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {ART_STYLES.map((artStyle) => (
                  <div
                    key={artStyle.id}
                    onClick={() => setSelectedArtStyle(artStyle.id)}
                    className={`style-card glass-card p-4 cursor-pointer transition-all duration-300 ${selectedArtStyle === artStyle.id ? 'style-card-selected pulse-glow' : ''}`}
                  >
                    <div className="aspect-video bg-slate-800 rounded-xl mb-3 overflow-hidden">
                      <img 
                        src={artStyle.referenceImage} 
                        alt={artStyle.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-base font-bold text-white text-center">{artStyle.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-8 flex flex-col gap-6">
            <div className="glass-card glass-card-hover p-8 slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-2xl">
                  🎬
                </div>
                <h2 className="text-2xl font-bold text-white">场景风格</h2>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {VIDEO_STYLES.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`style-card glass-card p-4 cursor-pointer transition-all duration-300 ${selectedStyle === style.id ? 'style-card-selected pulse-glow' : ''}`}
                  >
                    <div className="aspect-video bg-slate-800 rounded-xl mb-3 overflow-hidden">
                      <img 
                        src={style.referenceImage} 
                        alt={style.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white truncate text-center">{style.name}</h3>
                    <div className="flex gap-1 mt-2 justify-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-400">5s</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card glass-card-hover p-8 slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  📺
                </div>
                <h2 className="text-2xl font-bold text-white">视频预览</h2>
              </div>
              
              {videoUrl ? (
                <div className="space-y-6">
                  <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden">
                    <video 
                      src={videoUrl} 
                      controls 
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                    />
                  </div>
                  <a 
                    href={videoUrl} 
                    download="spring-festival-video.mp4"
                    className="neon-button w-full flex items-center justify-center gap-3 py-5 text-xl"
                  >
                    <span className="text-3xl">📥</span>
                    <span>下载视频</span>
                  </a>
                </div>
              ) : (
                <div className="h-80 flex flex-col items-center justify-center text-center p-8">
                  <div className="text-6xl mb-4 opacity-50">🎞️</div>
                  <p className="text-slate-500 text-xl">上传照片，选择风格，点击生成</p>
                  <p className="text-slate-600 text-base mt-2">你的专属拜年视频将在这里显示</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
