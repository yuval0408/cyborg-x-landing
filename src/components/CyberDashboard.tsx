import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Cpu, Radio, Zap, Activity, Waves } from 'lucide-react';

export default function CyberDashboard() {
  const [thermalLimit, setThermalLimit] = useState(85);
  const [isCooling, setIsCooling] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(0);
  const [powerCore, setPowerCore] = useState(0);
  const [latency, setLatency] = useState(0);
  const [isSynced, setIsSynced] = useState(true);
  const [activeTab, setActiveTab] = useState<'hologram' | 'bio'>('hologram');
  
  // Real-time canvas reference
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  // Initial loading animations simulating telemetry powering up
  useEffect(() => {
    const aiTimer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1.5;
        if (current >= 98.4) {
          setAiProcessing(98.4);
          clearInterval(interval);
        } else {
          setAiProcessing(parseFloat(current.toFixed(1)));
        }
      }, 16);
    }, 400);

    const powerTimer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current >= 97) {
          setPowerCore(97);
          clearInterval(interval);
        } else {
          setPowerCore(current);
        }
      }, 16);
    }, 700);

    const latencyTimer = setTimeout(() => {
      let current = 45;
      const interval = setInterval(() => {
        current -= 1.5;
        if (current <= 3) {
          setLatency(3);
          clearInterval(interval);
        } else {
          setLatency(Math.floor(current));
        }
      }, 16);
    }, 1000);

    return () => {
      clearTimeout(aiTimer);
      clearTimeout(powerTimer);
      clearTimeout(latencyTimer);
    };
  }, []);

  // Cooling procedure interaction
  const triggerCooling = () => {
    if (isCooling) return;
    setIsCooling(true);
    let temp = thermalLimit;
    const interval = setInterval(() => {
      temp -= 0.8;
      if (temp <= 52.4) {
        setThermalLimit(52.4);
        clearInterval(interval);
        setIsCooling(false);
      } else {
        setThermalLimit(parseFloat(temp.toFixed(1)));
      }
    }, 30);
  };

  // Canvas 1: Holographic Pattern Analysis wave generator
  useEffect(() => {
    const canvas = canvasRef1.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth || 300;
    let height = canvas.height = canvas.clientHeight || 150;

    let animationId: number;
    let phase = 0;

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth || 300;
      height = canvas.height = canvas.clientHeight || 150;
    });
    resizeObserver.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 0.05;

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw glowing waves
      const drawWave = (color: string, amp: number, freq: number, offset: number, lineWidth: number, blur: boolean) => {
        ctx.save();
        if (blur) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = color;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        for (let x = 0; x < width; x++) {
          const y = height / 2 + 
            Math.sin(x * freq + phase + offset) * amp * Math.sin(x * 0.005 + phase * 0.2);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      };

      // Greenish/Cyan primary waves
      drawWave('#00f5ff', 25, 0.015, 0, 2.0, true);
      drawWave('rgba(139, 92, 246, 0.4)', 15, 0.025, Math.PI / 3, 1.5, false);
      drawWave('rgba(0, 245, 255, 0.15)', 35, 0.008, Math.PI / 2, 1.0, false);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  // Canvas 2: Bio-feedback Telemetry heartbeats/synaptic pulses
  useEffect(() => {
    const canvas = canvasRef2.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.clientWidth || 300;
    let height = canvas.height = canvas.clientHeight || 150;

    let animationId: number;
    let phase = 0;

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth || 300;
      height = canvas.height = canvas.clientHeight || 150;
    });
    resizeObserver.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 0.08;

      // Draw subtle polar/circular coordinate grid lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.lineWidth = 1;
      const cx = width / 2;
      const cy = height / 2;
      for (let r = 20; r < 120; r += 30) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw pulsing biometric circular analyzer
      ctx.strokeStyle = '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#8b5cf6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      const segments = 100;
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // procedural bio wave
        const rNoise = Math.sin(theta * 6 + phase) * 8 + Math.cos(theta * 12 - phase * 1.5) * 4;
        const radius = 55 + rNoise;
        const x = cx + Math.cos(theta) * radius;
        const y = cy + Math.sin(theta) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      // Outer revolving indicators
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.3)';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, phase * 0.2, phase * 0.2 + Math.PI * 0.8);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, 82, -phase * 0.3, -phase * 0.3 + Math.PI * 0.5);
      ctx.stroke();

      // Center digital heartbeat numbers
      ctx.fillStyle = '#00f5ff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('HEART_COGNITIVE: STABLE', cx, cy - 12);
      ctx.fillStyle = '#dbe3ec';
      ctx.font = '18px monospace';
      ctx.fillText(`${(72 + Math.sin(phase) * 2).toFixed(0)} BPM`, cx, cy + 8);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  return (
    <div className="bg-cyber-dark/80 rounded-lg p-6 md:p-12 border border-[#3a494a]/30 relative overflow-hidden shadow-2xl">
      {/* Background radial soft light overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header telemetry status bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-glow text-cyber-cyan">System Core OS</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping" />
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-1">Diagnostics: Terminal 04 - Online</p>
        </div>

        {/* Action badges */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={triggerCooling}
            className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold transition-all ${
              thermalLimit > 70 
                ? 'bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25' 
                : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${thermalLimit > 70 ? 'animate-bounce' : ''}`} />
            {isCooling ? 'COOLING DOWN...' : `TEMP: ${thermalLimit}°C ${thermalLimit > 70 ? '(OVERHEAT)' : '(OPTIMAL)'}`}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSynced(!isSynced)}
            className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold transition-all ${
              isSynced 
                ? 'bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan' 
                : 'bg-yellow-500/15 border border-yellow-500/40 text-yellow-400'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isSynced ? 'animate-pulse' : ''}`} />
            {isSynced ? 'SYNCED' : 'DESYNCED'}
          </motion.button>
        </div>
      </div>

      {/* Telemetry Bento Grid Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Widget 1: AI Processing */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -3, borderColor: 'rgba(0, 245, 255, 0.25)' }}
          className="p-6 rounded bg-[#192126]/60 border border-[#3a494a]/20 flex flex-col justify-between"
        >
          <div>
            <div className="text-gray-400 font-mono text-xs tracking-wider flex items-center gap-1.5 mb-2">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
              AI PROCESSING
            </div>
            <div className="text-3xl font-display font-bold text-white tracking-tight">
              {aiProcessing}%
            </div>
          </div>
          <div className="w-full bg-[#2e363c] h-1.5 rounded-full mt-6 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${aiProcessing}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="bg-cyber-cyan h-full shadow-[0_0_8px_#00f5ff]" 
            />
          </div>
        </motion.div>

        {/* Widget 2: Neural Link */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -3, borderColor: 'rgba(139, 92, 246, 0.25)' }}
          className="p-6 rounded bg-[#192126]/60 border border-[#3a494a]/20 flex flex-col justify-between"
        >
          <div>
            <div className="text-gray-400 font-mono text-xs tracking-wider flex items-center gap-1.5 mb-2">
              <Waves className="w-3.5 h-3.5 text-cyber-purple" />
              NEURAL LINK
            </div>
            <div className="text-3xl font-display font-bold text-cyber-purple tracking-tight">
              {isSynced ? 'STABLE' : 'UNSTABLE'}
            </div>
          </div>
          {/* Pulsing visual bar equalizer */}
          <div className="flex gap-1.5 items-end h-6 mt-6">
            {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
              const pulseDuration = 0.5 + bar * 0.15;
              return (
                <motion.div
                  key={bar}
                  animate={{ height: isSynced ? ['20%', '100%', '20%'] : ['10%', '40%', '10%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: pulseDuration,
                    ease: 'easeInOut',
                  }}
                  className={`w-1 rounded-full ${isSynced ? 'bg-cyber-purple' : 'bg-yellow-500'}`}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Widget 3: Power Core */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -3, borderColor: 'rgba(255, 255, 255, 0.15)' }}
          className="p-6 rounded bg-[#192126]/60 border border-[#3a494a]/20 flex flex-col justify-between"
        >
          <div>
            <div className="text-gray-400 font-mono text-xs tracking-wider flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              POWER CORE
            </div>
            <div className="text-3xl font-display font-bold text-white tracking-tight">
              {powerCore}%
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-6 text-cyber-cyan text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            EFFICIENCY MAX
          </div>
        </motion.div>

        {/* Widget 4: Latency */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -3, borderColor: 'rgba(0, 245, 255, 0.25)' }}
          className="p-6 rounded bg-[#192126]/60 border border-[#3a494a]/20 flex flex-col justify-between"
        >
          <div>
            <div className="text-gray-400 font-mono text-xs tracking-wider flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-cyber-cyan" />
              LATENCY
            </div>
            <div className="text-3xl font-display font-bold text-cyber-cyan tracking-tight">
              {latency}ms
            </div>
          </div>
          <div className="text-gray-400 font-mono text-[10px] mt-6 tracking-tight">
            LOCAL QUANTUM NODE
          </div>
        </motion.div>
      </div>

      {/* Holographic pattern & biometric diagnostics panel */}
      <div className="bg-[#151d22]/80 border border-[#3a494a]/20 rounded-lg p-6">
        <div className="flex border-b border-[#3a494a]/20 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('hologram')}
            className={`mr-6 pb-2 font-display text-sm font-semibold tracking-wider transition-all relative ${
              activeTab === 'hologram' ? 'text-cyber-cyan' : 'text-gray-400 hover:text-white'
            }`}
          >
            Holographic Pattern Analysis
            {activeTab === 'hologram' && (
              <motion.div layoutId="activeDiagTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-cyan" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('bio')}
            className={`pb-2 font-display text-sm font-semibold tracking-wider transition-all relative ${
              activeTab === 'bio' ? 'text-cyber-purple' : 'text-gray-400 hover:text-white'
            }`}
          >
            Bio-feedback Telemetry
            {activeTab === 'bio' && (
              <motion.div layoutId="activeDiagTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-purple" />
            )}
          </button>
        </div>

        {/* Canvas Display container */}
        <div className="relative h-64 w-full flex items-center justify-center bg-black/40 rounded-lg overflow-hidden border border-[#3a494a]/10 p-2">
          {activeTab === 'hologram' ? (
            <div className="w-full h-full flex flex-col justify-between relative">
              <canvas ref={canvasRef1} className="w-full h-full object-contain" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-[10px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded">AXIS_GRID: CALIBRATED</span>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-400/10 px-2 py-0.5 rounded">FREQ_BAND: 432HZ</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-between relative">
              <canvas ref={canvasRef2} className="w-full h-full object-contain" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-[10px] font-mono text-cyber-purple bg-cyber-purple/10 px-2 py-0.5 rounded">CEREBRAL_WAVE: DELTA</span>
                <span className="text-[10px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded">FLOW_STATE: 94.2%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
