import { useState, useRef, useEffect } from 'react';
import './dashboard.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
  // State for filters
  const [selectedQuarter, setSelectedQuarter] = useState('Q2');
  const [selectedYear, setSelectedYear] = useState('2025');
  // State for sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // State for download modal
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  // State for year dropdown
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // References
  const dashboardRef = useRef(null);
  const sidebarRef = useRef(null);
  const hoverZoneRef = useRef(null);
  const contentRef = useRef(null);
  const yearDropdownRef = useRef(null);

  // Custom style for gauge charts
  const gaugeChartStyle = {
    height: 220,
    width: '100%',
    margin: '0 auto',
  };

  // Function to handle sidebar visibility
  const handleSidebarEnter = () => {
    setSidebarVisible(true);
  };

  const handleSidebarLeave = () => {
    setSidebarVisible(false);
  };

  // Function to toggle year dropdown
  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen);
  };

  // Function to select a year
  const selectYear = (year) => {
    setSelectedYear(year.toString());
    setYearDropdownOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setYearDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle sidebar for touch devices
  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  // Effect to add event listeners for hover detection
  useEffect(() => {
    const sidebar = sidebarRef.current;
    const hoverZone = hoverZoneRef.current;

    if (sidebar && hoverZone) {
      // Mouse events for desktop
      hoverZone.addEventListener('mouseenter', handleSidebarEnter);
      sidebar.addEventListener('mouseenter', handleSidebarEnter);
      sidebar.addEventListener('mouseleave', handleSidebarLeave);

      // Touch event for mobile - toggle on tap of the visible part
      hoverZone.addEventListener('click', toggleSidebar);

      return () => {
        hoverZone.removeEventListener('mouseenter', handleSidebarEnter);
        sidebar.removeEventListener('mouseenter', handleSidebarEnter);
        sidebar.removeEventListener('mouseleave', handleSidebarLeave);
        hoverZone.removeEventListener('click', toggleSidebar);
      };
    }
  }, []);

  // Gauge meter values
  const inherentRiskValue = 71;
  const residualRiskValue = 63;

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Close sidebar on small screens when resizing
      if (window.innerWidth < 768 && sidebarVisible) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarVisible]);



  // Control Performance Pie Chart Data
  const controlPerformanceData = {
    labels: ['Partially Effective', 'Fully Effective', 'Mostly Effective', 'Mostly Ineffective', 'None'],
    datasets: [
      {
        data: [27, 10, 2, 37, 24], // Updated to include Fully Effective
        backgroundColor: [
          '#FFC107', // Yellow - Partially Effective
          '#228B22', // Forest Green - Fully Effective
          '#4CAF50', // Green - Mostly Effective
          '#FF9800', // Orange - Mostly Ineffective
          '#800020', // Burgundy - None
        ],
        borderWidth: 0,
      },
    ],
  };

  // Risk Status Data (replacing Business Unit Distribution)
  const riskStatusData = {
    labels: ['High', 'Medium', 'Low', 'Very Low', 'Negligible'],
    datasets: [
      {
        label: 'Number of Risks',
        data: [18, 22, 12, 7, 3],
        backgroundColor: '#800020', // Burgundy color
      },
    ],
  };

  // Risk Category Distribution Data
  const riskCategoryData = {
    labels: ['Operational risk', 'ICT risk', 'Regulatory risk', 'Fraud risk', 'Market risk', 'Strategic risk', 'Insurance risk', 'Investment risk', 'Reputational Risk'],
    datasets: [
      {
        label: 'Number of Risks',
        data: [25, 13, 10, 4, 4, 3, 1, 1, 1],
        backgroundColor: '#800020', // Burgundy color
      },
    ],
  };

  // Chart options
  const horizontalBarOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const verticalBarOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };



  // Calculate control effectiveness as sum of Mostly effective, Fully effective, Partially effective
  const controlEffectivenessValue = controlPerformanceData.datasets[0].data[0] +
                                   controlPerformanceData.datasets[0].data[1] +
                                   controlPerformanceData.datasets[0].data[2];

  // Export functions
  const exportToPDF = () => {
    html2canvas(dashboardRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dashboard.pdf');
    });
  };

  const exportToJPEG = () => {
    html2canvas(dashboardRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'dashboard.jpeg';
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    });
  };


  return (
    <div className="dashboard-main-layout">
      {/* Hover detection zone */}
      <div className="sidebar-hover-zone" ref={hoverZoneRef}></div>

      {/* Sidebar with hover behavior */}
      <aside
        className={`dashboard-sidebar ${sidebarVisible ? 'visible' : ''}`}
        ref={sidebarRef}
      >
        <div className="sidebar-logo">
          <h2 className="cic-logo">CIC</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Risk</li>
            <li>Compliance</li>
            <li>Fraud</li>
            <li>ICT Risk</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content - adjusts based on sidebar state */}
      <div
        className={`dashboard-content ${sidebarVisible ? 'sidebar-visible' : ''}`}
        ref={(el) => {
          dashboardRef.current = el;
          contentRef.current = el;
        }}
      >
        {/* Top Bar */}
        <header className="dashboard-header">
          <h1>Dashboard</h1>

          <div className="header-actions">
            <button className="download-button" onClick={() => setDownloadModalVisible(true)}>
              <span className="download-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </span>
              Download
            </button>
            <div className="user-profile">
              <span className="user-avatar">U</span>
              <span className="user-name">Welcome, User</span>
            </div>
          </div>
        </header>

        {/* Centralized Filter Bar */}
        <div className="centralized-filter-bar">
          <div className="filter-container">
            <div className="year-selector">
              <div className={`year-dropdown ${yearDropdownOpen ? 'open' : ''}`} ref={yearDropdownRef}>
                <div className="year-dropdown-header" onClick={toggleYearDropdown}>
                  {selectedYear}
                </div>
                <div className="year-dropdown-menu">
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                    <div
                      key={year}
                      className={`year-option ${selectedYear === year.toString() ? 'selected' : ''}`}
                      onClick={() => selectYear(year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-group quarter-filter">
              <div className="quarter-select-wrapper">
                <select
                  id="quarter-select"
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="modern-select"
                >
                  <option value="Q1">Quarter 1</option>
                  <option value="Q2">Quarter 2</option>
                  <option value="Q3">Quarter 3</option>
                  <option value="Q4">Quarter 4</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Download Modal */}
        {downloadModalVisible && (
          <div className="modal-overlay" onClick={() => setDownloadModalVisible(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Download Dashboard</h3>
                <button className="modal-close" onClick={() => setDownloadModalVisible(false)} aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <button className="modal-option" onClick={() => {
                  exportToPDF();
                  setDownloadModalVisible(false);
                }}>
                  <span className="option-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </span>
                  <div className="option-details">
                    <h4>Download as PDF</h4>
                    <p>Save dashboard as a PDF document</p>
                  </div>
                </button>
                <button className="modal-option" onClick={() => {
                  exportToJPEG();
                  setDownloadModalVisible(false);
                }}>
                  <span className="option-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </span>
                  <div className="option-details">
                    <h4>Download as JPEG</h4>
                    <p>Save dashboard as a JPEG image</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Risk Metrics Cards */}
        <div className="risk-metrics-container">
          <div className="risk-metric-card">
            <div className="risk-metric-header">
              <h2>62</h2>
              <p>No. of Risks</p>
            </div>
            <div className="risk-metric-label">Inherent Risk Level</div>
            <div className="risk-gauge-container">
              <div className="risk-gauge">
                <GaugeChart
                  id="inherent-risk-gauge"
                  nrOfLevels={20}
                  arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                  colors={["#4CAF50", "#FFC107", "#FF9800", "#F44336", "#B71C1C"]}
                  arcWidth={0.4}
                  arcPadding={0.02}
                  cornerRadius={5}
                  percent={inherentRiskValue / 100}
                  textColor="#800020"
                  needleColor="#800020"
                  needleBaseColor="#800020"
                  animate={true}
                  animateDuration={2000}
                  formatTextValue={value => {
                    const percent = Math.round(value * 100);
                    const category = percent <= 20 ? "Incidental" :
                                    percent <= 40 ? "Moderate Low" :
                                    percent <= 60 ? "Moderate High" :
                                    percent <= 80 ? "Significant High" : "Extreme";
                    return `${percent}% - ${category}`;
                  }}
                  style={gaugeChartStyle}
                />
              </div>
              <div className="gauge-title">INHERENT RISK METER</div>
            </div>
          </div>

          <div className="risk-metric-card">
            <div className="risk-metric-header">
              <h2>63%</h2>
              <p>Residual Risk Exposure</p>
            </div>
            <div className="risk-metric-label">Residual Risk Level</div>
            <div className="risk-gauge-container">
              <div className="risk-gauge">
                <GaugeChart
                  id="residual-risk-gauge"
                  nrOfLevels={20}
                  arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                  colors={["#4CAF50", "#FFC107", "#FF9800", "#F44336", "#B71C1C"]}
                  arcWidth={0.4}
                  arcPadding={0.02}
                  cornerRadius={5}
                  percent={residualRiskValue / 100}
                  textColor="#800020"
                  needleColor="#800020"
                  needleBaseColor="#800020"
                  animate={true}
                  animateDuration={2000}
                  formatTextValue={value => {
                    const percent = Math.round(value * 100);
                    const category = percent <= 20 ? "Incidental" :
                                    percent <= 40 ? "Moderate Low" :
                                    percent <= 60 ? "Moderate High" :
                                    percent <= 80 ? "Significant High" : "Extreme";
                    return `${percent}% - ${category}`;
                  }}
                  style={gaugeChartStyle}
                />
                <div className="risk-details-overlay">
                  <div className="risk-details-content">
                    <div className="risk-percentage">{residualRiskValue}%</div>
                    <div className="risk-category">
                      {residualRiskValue <= 20 ? "Incidental" :
                       residualRiskValue <= 40 ? "Moderate Low" :
                       residualRiskValue <= 60 ? "Moderate High" :
                       residualRiskValue <= 80 ? "Significant High" : "Extreme"}
                    </div>
                    <div className="risk-description">
                      Residual risk is the level of risk that remains after controls and mitigating actions have been applied.
                      This represents the current exposure level for the organization.
                    </div>
                  </div>
                </div>
              </div>
              <div className="gauge-title">RESIDUAL RISK METER</div>
            </div>
          </div>

          <div className="risk-metric-card">
            <div className="risk-metric-header">
              <h2>{controlEffectivenessValue}%</h2>
              <p>Control Effectiveness</p>
            </div>
            <div className="risk-metric-label">Control Performance</div>
            <div className="control-chart-container">
              <Doughnut
                data={controlPerformanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 10,
                        font: {
                          size: 10
                        }
                      }
                    }
                  }
                }}
              />
              <div className="risk-details-overlay">
                <div className="risk-details-content">
                  <div className="risk-percentage">{controlEffectivenessValue}%</div>
                  <div className="risk-category">Control Effectiveness</div>
                  <div className="risk-description">
                    <p>Breakdown of control performance:</p>
                    <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                      <li>Partially Effective: {controlPerformanceData.datasets[0].data[0]}%</li>
                      <li>Fully Effective: {controlPerformanceData.datasets[0].data[1]}%</li>
                      <li>Mostly Effective: {controlPerformanceData.datasets[0].data[2]}%</li>
                      <li>Mostly Ineffective: {controlPerformanceData.datasets[0].data[3]}%</li>
                      <li>None: {controlPerformanceData.datasets[0].data[4]}%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Charts and Risk Thresholds */}
        <div className="distribution-charts-container">
          <div className="distribution-chart">
            <h3>Risk Status</h3>
            <div className="chart-container">
              <Bar data={riskStatusData} options={verticalBarOptions} />
            </div>
          </div>

          <div className="distribution-chart">
            <h3>Distribution by Risk Category</h3>
            <div className="chart-container">
              <Bar data={riskCategoryData} options={horizontalBarOptions} />
            </div>
          </div>

          {/* Risk Thresholds - Now positioned next to the charts */}
          <div className="risk-thresholds">
            <div className="threshold-card above">
              <h2>49</h2>
              <p>No. of Risks Above Risk Threshold</p>
            </div>
            <div className="threshold-card within">
              <h2>13</h2>
              <p>No. of Risks Within Risk Threshold</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
