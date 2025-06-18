/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@deed3labs/protocolsdk', '@reown/appkit'],
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config, { isServer }) => {
    // Add support for ESM modules
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.mts', '.mtsx'],
    };

    // Handle ESM modules
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // Add support for ESM modules in node_modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      module: false,
    };

    // Add specific handling for @reown/appkit
    config.module.rules.push({
      test: /node_modules\/@reown\/appkit\/.*\.js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // Add support for dynamic imports
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-dynamic-import'],
        },
      },
    });

    // Add support for ESM modules in node_modules
    config.module.rules.push({
      test: /node_modules\/.*\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // Add support for source maps
    config.devtool = 'source-map';
    
    return config;
  },
};

module.exports = nextConfig; 