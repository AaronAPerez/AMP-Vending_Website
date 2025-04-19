declare namespace JSX {
    interface IntrinsicElements {
      'gmpx-api-loader': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        key?: string;
        'solution-channel'?: string;
      }, HTMLElement>;
      
      'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        center?: string;
        zoom?: string | number;
        'map-id'?: string;
      }, HTMLElement>;
      
      'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        position?: string;
      }, HTMLElement>;
      
      'gmpx-place-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        placeholder?: string;
      }, HTMLElement>;
    }
  }