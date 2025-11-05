'use client';

import { Navigation, Phone, Search, X } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoidGllbmRhdDI5MjAwMyIsImEiOiJjbTY2ODI5N3UxeW5qMmpzZXN0bHhhdDgwIn0.g0Ru7u-80lyOSd_BMHEBvQ';

type Branch = {
  name: string;
  address: string;
  coordinates: [number, number];
  phone?: string;
  services?: string[];
};

const branches: Branch[] = [
  {
    name: 'Chi nhánh Hà Nội',
    address: '123 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    coordinates: [105.8011826, 21.000885],
    phone: '024 1234 5678',
    services: ['ATM', 'Giao dịch tiền mặt', 'Tư vấn vay'],
  },
  {
    name: 'Chi nhánh TP. Hồ Chí Minh',
    address: '45 Lê Lợi, Quận 1, TP.HCM',
    coordinates: [106.70098, 10.77689],
    phone: '028 9876 5432',
    services: ['ATM', 'Tư vấn đầu tư', 'Giao dịch ngoại tệ'],
  },
  {
    name: 'Chi nhánh Đà Nẵng',
    address: '56 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    coordinates: [108.22083, 16.06778],
    phone: '0236 222 3333',
    services: ['ATM', 'Tư vấn tiết kiệm'],
  },
  {
    name: 'Chi nhánh Cần Thơ',
    address: '12 Nguyễn Trãi, Ninh Kiều, Cần Thơ',
    coordinates: [105.78559, 10.03124],
    phone: '0292 555 8888',
    services: ['ATM', 'Tư vấn vay', 'Chuyển tiền nhanh'],
  },
  {
    name: 'Chi nhánh Hải Phòng',
    address: '89 Lạch Tray, Ngô Quyền, Hải Phòng',
    coordinates: [106.68214, 20.84491],
    phone: '0225 369 9999',
    services: ['ATM', 'Giao dịch ngoại tệ', 'Tư vấn tiết kiệm'],
  },
  {
    name: 'Chi nhánh Nghệ An',
    address: '22 Nguyễn Sỹ Sách, TP. Vinh, Nghệ An',
    coordinates: [105.69272, 18.67958],
    phone: '0238 222 3333',
    services: ['ATM', 'Tư vấn vay', 'Chuyển tiền nội địa'],
  },
  {
    name: 'Chi nhánh Bình Dương',
    address: '88 Đại lộ Bình Dương, Thủ Dầu Một, Bình Dương',
    coordinates: [106.65653, 10.98197],
    phone: '0274 111 4444',
    services: ['ATM', 'Tư vấn đầu tư', 'Dịch vụ doanh nghiệp'],
  },
  {
    name: 'Chi nhánh Đồng Nai',
    address: '45 Phạm Văn Thuận, Biên Hòa, Đồng Nai',
    coordinates: [106.82491, 10.94823],
    phone: '0251 222 9999',
    services: ['ATM', 'Giao dịch tiền mặt', 'Tư vấn vay cá nhân'],
  },
  {
    name: 'Chi nhánh Khánh Hòa',
    address: '23 Trần Phú, Nha Trang, Khánh Hòa',
    coordinates: [109.19675, 12.23879],
    phone: '0258 666 1234',
    services: ['ATM', 'Tư vấn du lịch', 'Đổi ngoại tệ'],
  },
  {
    name: 'Chi nhánh Huế',
    address: '40 Lê Lợi, TP. Huế',
    coordinates: [107.58429, 16.46371],
    phone: '0234 555 1212',
    services: ['ATM', 'Giao dịch tiết kiệm', 'Tư vấn vay'],
  },
  {
    name: 'Chi nhánh Quảng Ninh',
    address: '67 Hạ Long, Bãi Cháy, Quảng Ninh',
    coordinates: [107.04764, 20.95336],
    phone: '0203 888 5555',
    services: ['ATM', 'Tư vấn đầu tư', 'Chuyển tiền quốc tế'],
  },
  {
    name: 'Chi nhánh Lâm Đồng',
    address: '11 Trần Phú, Đà Lạt, Lâm Đồng',
    coordinates: [108.44193, 11.94042],
    phone: '0263 777 6666',
    services: ['ATM', 'Gửi tiết kiệm', 'Tư vấn vay'],
  },
  {
    name: 'Chi nhánh Thái Nguyên',
    address: '35 Hoàng Văn Thụ, TP. Thái Nguyên',
    coordinates: [105.84969, 21.59422],
    phone: '0208 456 7777',
    services: ['ATM', 'Tư vấn tài chính cá nhân'],
  },
  {
    name: 'Chi nhánh Bắc Ninh',
    address: '19 Nguyễn Gia Thiều, TP. Bắc Ninh',
    coordinates: [106.05829, 21.18608],
    phone: '0222 333 4444',
    services: ['ATM', 'Giao dịch doanh nghiệp'],
  },
  {
    name: 'Chi nhánh Nam Định',
    address: '92 Trần Hưng Đạo, TP. Nam Định',
    coordinates: [106.1629, 20.42026],
    phone: '0228 678 9999',
    services: ['ATM', 'Tư vấn vay', 'Dịch vụ tiết kiệm'],
  },
  {
    name: 'Chi nhánh Thanh Hóa',
    address: '55 Lê Hoàn, TP. Thanh Hóa',
    coordinates: [105.77867, 19.80745],
    phone: '0237 333 8888',
    services: ['ATM', 'Tư vấn tài chính', 'Bảo hiểm'],
  },
  {
    name: 'Chi nhánh Quảng Ngãi',
    address: '18 Lê Lợi, TP. Quảng Ngãi',
    coordinates: [108.80302, 15.12047],
    phone: '0255 777 5555',
    services: ['ATM', 'Giao dịch tiết kiệm', 'Tư vấn vay'],
  },
  {
    name: 'Chi nhánh Kiên Giang',
    address: '29 Nguyễn Trung Trực, Rạch Giá, Kiên Giang',
    coordinates: [105.0893, 10.01265],
    phone: '0297 456 9999',
    services: ['ATM', 'Tư vấn doanh nghiệp nhỏ', 'Chuyển tiền nhanh'],
  },
  {
    name: 'Chi nhánh Bà Rịa - Vũng Tàu',
    address: '76 Trương Công Định, Vũng Tàu',
    coordinates: [107.08426, 10.34602],
    phone: '0254 123 4567',
    services: ['ATM', 'Tư vấn vay', 'Dịch vụ ngoại tệ'],
  },
  {
    name: 'Chi nhánh Long An',
    address: '66 Nguyễn Huệ, Tân An, Long An',
    coordinates: [106.41341, 10.53812],
    phone: '0272 888 2222',
    services: ['ATM', 'Giao dịch tiết kiệm', 'Tư vấn đầu tư'],
  },
];

export default function BankBranchesPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
    || branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (map.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [106.5, 16.5],
      zoom: 5.5,
    });

    // Thêm navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Thêm CSS animations
    if (!document.getElementById('marker-styles')) {
      const style = document.createElement('style');
      style.id = 'marker-styles';
      style.textContent = `
        @keyframes pulse {
          0%, 100% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.1); }
        }
        @keyframes ripple {
          0% { transform: translateX(-50%) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(-50%) scale(2); opacity: 0; }
        }
        .custom-marker:hover > div > div:first-child {
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.8), 0 0 50px rgba(0, 255, 255, 0.6) !important;
          transform: rotate(-45deg) scale(1.15) !important;
        }
        .mapboxgl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .mapboxgl-popup-tip {
          border-top-color: #0e1824 !important;
        }
      `;
      document.head.appendChild(style);
    }

    branches.forEach((branch) => {
      // tạo popup hiển thị thông tin chi nhánh
      const popup = new mapboxgl.Popup({
        offset: [0, -25],
        closeButton: false,
      }).setHTML(`
    <div style="
      background: linear-gradient(135deg, #0e1824 0%, #1a2332 100%);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid rgba(0, 255, 255, 0.3);
      min-width: 200px;
    ">
      <h3 style="margin:0;color:#00ffff;font-size:16px;font-weight:600;">${branch.name}</h3>
      <p style="margin:6px 0 0 0;color:#ccc;font-size:13px;line-height:1.4;">${branch.address}</p>
      ${branch.phone ? `<p style="margin:4px 0 0 0;color:#00cccc;font-size:12px;">📞 ${branch.phone}</p>` : ''}
    </div>
  `);

      // tạo marker mặc định với màu cyan
      const marker = new mapboxgl.Marker({ color: '#00ffff' })
        .setLngLat(branch.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      // thêm event click để flyTo vị trí chi nhánh
      marker.getElement().addEventListener('click', () => {
        setActiveBranch(branch);
        map.current!.flyTo({
          center: branch.coordinates,
          zoom: 14,
          essential: true,
          duration: 1500,
          offset: [0, -100],
        });
      });
    });
  }, []);

  const handleBranchSelect = (branch: Branch) => {
    setActiveBranch(branch);
    setShowSearch(false);
    setSearchQuery('');
    map.current?.flyTo({
      center: branch.coordinates,
      zoom: 14,
      duration: 1500,
      offset: [0, -100]
    });
  };

  const resetView = () => {
    setActiveBranch(null);
    map.current?.flyTo({
      center: [106.5, 16.5],
      zoom: 5.5,
      duration: 1500
    });
  };

  return (
    <div className="relative w-full h-screen bg-[#08121d]">
      {/* Map */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Top Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
        <div className="bg-[#0e1824]/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chi nhánh..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearch(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearch(searchQuery.length > 0)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showSearch && (
            <div className="border-t border-cyan-400/20 max-h-64 overflow-y-auto">
              {filteredBranches.length > 0 ? (
                filteredBranches.map(branch => (
                  <button
                    key={branch.name}
                    onClick={() => handleBranchSelect(branch)}
                    className="w-full text-left p-4 hover:bg-cyan-400/10 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <h3 className="text-cyan-300 font-semibold text-sm">{branch.name}</h3>
                    <p className="text-gray-400 text-xs mt-1">{branch.address}</p>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Không tìm thấy chi nhánh
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reset Button */}
      {activeBranch && (
        <button
          onClick={resetView}
          className="absolute top-6 right-6 z-10 bg-[#0e1824]/95 backdrop-blur-xl border border-cyan-400/30 rounded-full p-3 hover:bg-cyan-400/20 transition-all shadow-xl"
          title="Xem tất cả chi nhánh"
        >
          <Navigation className="w-5 h-5 text-cyan-400" />
        </button>
      )}

      {/* Active Branch Info Card */}
      {activeBranch && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
          <div className="bg-[#0e1824]/98 backdrop-blur-xl border border-cyan-400/40 rounded-2xl shadow-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-cyan-300">{activeBranch.name}</h3>
                <p className="text-gray-300 text-sm mt-1 leading-relaxed">{activeBranch.address}</p>
              </div>
              <button
                onClick={() => setActiveBranch(null)}
                className="text-gray-400 hover:text-cyan-400 transition-colors ml-2 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeBranch.phone && (
              <a
                href={`tel:${activeBranch.phone}`}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm mb-3"
              >
                <Phone className="w-4 h-4" />
                {activeBranch.phone}
              </a>
            )}

            <div className="flex flex-wrap gap-2">
              {activeBranch.services?.map(service => (
                <span
                  key={service}
                  className="text-xs bg-cyan-400/10 border border-cyan-400/30 text-cyan-200 rounded-full px-3 py-1"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Branch Count Badge */}
      <div className="absolute bottom-6 right-6 z-10 bg-[#0e1824]/95 backdrop-blur-xl border border-cyan-400/30 rounded-full px-4 py-2 shadow-xl">
        <p className="text-cyan-400 text-sm font-semibold">
          {branches.length}
          {' '}
          chi nhánh
        </p>
      </div>
    </div>
  );
}
