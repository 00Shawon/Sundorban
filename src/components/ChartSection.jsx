import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import villageData from '../data/villageData.json';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const seaLevelData = villageData.sea_level_data;
  const historicalData = seaLevelData.filter(d => !d.projection);

  const chartData = {
    labels: seaLevelData.map(d => d.year),
    datasets: [
      {
        label: 'Historical Sea Level Rise',
        data: historicalData.map(d => d.level_cm),
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#4ecdc4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Projected Sea Level Rise',
        data: seaLevelData.map(d => d.projection ? d.level_cm : null),
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#ff6b6b',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
        spanGaps: true,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: '600',
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Sea Level Rise in the Sundarbans',
        color: '#ffffff',
        font: {
          size: 20,
          weight: '700'
        },
        padding: {
          top: 20,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#4ecdc4',
        bodyColor: '#ffffff',
        borderColor: '#4ecdc4',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: +${context.parsed.y} cm`;
          },
          afterLabel: function(context) {
            const dataPoint = seaLevelData[context.dataIndex];
            if (dataPoint.projection) {
              return '(Projected)';
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: 12
          },
          callback: function(value) {
            return '+' + value + ' cm';
          }
        },
        beginAtZero: true
      }
    },
    animation: {
      duration: isVisible ? 2000 : 0,
      easing: 'easeInOutQuart',
      delay: (context) => {
        return context.dataIndex * 100;
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-5 flex items-center justify-center"
    >
      <motion.div 
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Chart Container */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl mb-10">
          <div className="h-[400px] md:h-[500px]">
            <Line data={chartData} options={options} />
          </div>
          <p className="text-xs text-white/50 text-right mt-4">
            Data: Bangladesh Meteorological Dept. & IPCC AR6 Report
          </p>
        </div>
        
        {/* Insight Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="group bg-primary/10 border-2 border-primary rounded-2xl p-8 text-center text-white hover:-translate-y-2 transition-all duration-300 cursor-default">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
              +18 cm
            </h3>
            <p className="text-sm md:text-base opacity-90">
              Sea level rise since 2000
            </p>
          </div>
          
          <div className="group bg-primary/10 border-2 border-primary rounded-2xl p-8 text-center text-white hover:-translate-y-2 transition-all duration-300 cursor-default">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
              +65 cm
            </h3>
            <p className="text-sm md:text-base opacity-90">
              Projected by 2050
            </p>
          </div>
          
          <div className="group bg-primary/10 border-2 border-primary rounded-2xl p-8 text-center text-white hover:-translate-y-2 transition-all duration-300 cursor-default">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
              410 ha
            </h3>
            <p className="text-sm md:text-base opacity-90">
              Land lost to erosion
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ChartSection;
