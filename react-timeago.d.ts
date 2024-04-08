declare module 'react-timeago' {
    import * as React from 'react';
  
    interface ReactTimeagoProps {
      date: Date | number | string;
      live?: boolean;
      minPeriod?: number;
      title?: string;
      component?: React.ComponentType<any>;
      formatter?: (value: number, unit: string, suffix: string, date: Date, strings: { [key: string]: string }) => React.ReactNode;
      onMount?: (instance: React.ReactInstance) => void;
      onUnmount?: (instance: React.ReactInstance) => void;
      className?: string;
      style?: React.CSSProperties;
    }
  
    const ReactTimeago: React.FC<ReactTimeagoProps>;
    export default ReactTimeago;
  }