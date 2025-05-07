import { useEffect } from 'react';
import type { CryptoAsset } from '@/features/crypto/types';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { selectAssets, updatePrices } from '@/features/crypto/cryptoSlice';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.1);
`;

const TableRow = styled(motion.tr)`
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 8px;
      padding: 1px;
      background: linear-gradient(45deg, #00ffff, #ff00ff);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }
`;

const TableCell = styled.td`
  padding: 16px;
  text-align: right;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  
  &:first-of-type {
    border-left: 1px solid rgba(0, 255, 255, 0.1);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    text-align: left;
  }
  
  &:last-of-type {
    border-right: 1px solid rgba(0, 255, 255, 0.1);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const NameCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8));
  }
`;

const Change = styled.span<{ isPositive: boolean }>`
  color: ${(props: { isPositive: boolean }) => props.isPositive ? '#00ffff' : '#ff5050'};
  text-shadow: 0 0 10px ${(props: { isPositive: boolean }) => props.isPositive ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 80, 80, 0.5)'};
  font-weight: 500;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${(props: { isPositive: boolean }) => props.isPositive ? '#00ffff' : '#ff5050'};
    opacity: 0.5;
  }
`;

const formatNumber = (num: number, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const CryptoTable = () => {
  const assets = useSelector(selectAssets);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      assets.forEach((asset: CryptoAsset) => {
        const randomChange = () => (Math.random() - 0.5) * 2;
        dispatch(updatePrices({
          id: asset.id,
          price: asset.price * (1 + randomChange() * 0.01),
          changes: {
            '1h': asset.change1h + randomChange(),
            '24h': asset.change24h + randomChange(),
            '7d': asset.change7d + randomChange(),
          },
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch, assets]);

  const mockChartData = Array(20).fill(0).map(() => ({ value: Math.random() * 100 }));

  return (
    <Table>
      <thead>
        <tr>
          <TableCell as="th">#</TableCell>
          <TableCell as="th">Name</TableCell>
          <TableCell as="th">Price</TableCell>
          <TableCell as="th">1h %</TableCell>
          <TableCell as="th">24h %</TableCell>
          <TableCell as="th">7d %</TableCell>
          <TableCell as="th">Market Cap</TableCell>
          <TableCell as="th">Volume (24h)</TableCell>
          <TableCell as="th">Circulating Supply</TableCell>
          <TableCell as="th">7d Chart</TableCell>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset: CryptoAsset) => (
          <TableRow
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TableCell>{asset.id}</TableCell>
            <NameCell>
              <Logo src={asset.logo} alt={asset.name} />
              <div>
                <div>{asset.name}</div>
                <div style={{ color: '#666' }}>{asset.symbol}</div>
              </div>
            </NameCell>
            <TableCell>{formatPrice(asset.price)}</TableCell>
            <TableCell>
              <Change isPositive={asset.change1h >= 0}>{formatNumber(asset.change1h)}%</Change>
            </TableCell>
            <TableCell>
              <Change isPositive={asset.change24h >= 0}>{formatNumber(asset.change24h)}%</Change>
            </TableCell>
            <TableCell>
              <Change isPositive={asset.change7d >= 0}>{formatNumber(asset.change7d)}%</Change>
            </TableCell>
            <TableCell>${formatNumber(asset.marketCap / 1e9, 1)}B</TableCell>
            <TableCell>${formatNumber(asset.volume24h / 1e9, 1)}B</TableCell>
            <TableCell>{formatNumber(asset.circulatingSupply)}M</TableCell>
            <TableCell>
              <ResponsiveContainer width={120} height={40}>
                <LineChart data={mockChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00ffff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptoTable;
