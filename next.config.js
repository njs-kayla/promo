// next.config.js
const nextI18NextConfig = require('./next-i18next.config.js');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: nextI18NextConfig.i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: 'asset/resource',
      include: [
        path.resolve(__dirname, 'FF-25Feb/assets'),
        path.resolve(__dirname, 'FO-24Apr/assets'),
        path.resolve(__dirname, 'FO-24Apr2/assets'),
        path.resolve(__dirname, 'FO-24Apr3/assets'),
        path.resolve(__dirname, 'FO-24Aug/assets'),
        path.resolve(__dirname, 'FO-24Feb/assets'),
        path.resolve(__dirname, 'FO-24Jul/assets'),
        path.resolve(__dirname, 'FO-24Jul2/assets'),
        path.resolve(__dirname, 'FO-24Jun/assets'),
        path.resolve(__dirname, 'FO-24Mar/assets'),
        path.resolve(__dirname, 'FO-24May/assets'),
        path.resolve(__dirname, 'FO-24May2/assets'),
        path.resolve(__dirname, 'FO-24May3/assets'),
        path.resolve(__dirname, 'FO-24Nov/assets'),
        path.resolve(__dirname, 'FO-24Oct/assets'),
        path.resolve(__dirname, 'FO-24Oct2/assets'),
        path.resolve(__dirname, 'FO-24Oct3/assets'),
        path.resolve(__dirname, 'FO-24Sep/assets'),
        path.resolve(__dirname, 'FO-24Sep2/assets'),
        path.resolve(__dirname, 'FO-25Apr/assets'),
        path.resolve(__dirname, 'FO-25Apr2/assets'),
        path.resolve(__dirname, 'FO-25Jun/assets'),
        path.resolve(__dirname, 'FP-24Jan/assets'),
        path.resolve(__dirname, 'FP-24May/assets'),
        path.resolve(__dirname, 'FP-24Sep/assets'),
        path.resolve(__dirname, 'FP-25Jun/assets'),
        path.resolve(__dirname, 'SF-23Nov/assets'),
        path.resolve(__dirname, 'SF-24Apr/assets'),
        path.resolve(__dirname, 'SF-24Jan/assets'),
        path.resolve(__dirname, 'SF-24Jul/assets'),
        path.resolve(__dirname, 'SF-24Oct/assets'),
        path.resolve(__dirname, 'SF-25Apr/assets'),
        path.resolve(__dirname, 'SF-25Jan/assets'),
        path.resolve(__dirname, 'SO-23Aug/assets'),
        path.resolve(__dirname, 'SO-23Nov/assets'),
        path.resolve(__dirname, 'SO-23Nov2/assets'),
        path.resolve(__dirname, 'SO-23Nov3/assets'),
        path.resolve(__dirname, 'SO-24Apr/assets'),
        path.resolve(__dirname, 'SO-24Aug/assets'),
        path.resolve(__dirname, 'SO-24Aug2/assets'),
        path.resolve(__dirname, 'SO-24Dec/assets'),
        path.resolve(__dirname, 'SO-24Dec2/assets'),
        path.resolve(__dirname, 'SO-24Dec3/assets'),
        path.resolve(__dirname, 'SO-24Jul/assets'),
        path.resolve(__dirname, 'SO-24Jul2/assets'),
        path.resolve(__dirname, 'SO-24Mar/assets'),
        path.resolve(__dirname, 'SO-24May/assets'),
        path.resolve(__dirname, 'SO-25Feb/assets'),
        path.resolve(__dirname, 'SO-25Jul/assets'),
        path.resolve(__dirname, 'SO-25Mar/assets'),
        path.resolve(__dirname, 'SO-25Mar1/assets'),
        path.resolve(__dirname, 'SO-25May/assets'),
        path.resolve(__dirname, 'SP-23Nov/assets'),
        path.resolve(__dirname, 'SP-24Feb/assets'),
        path.resolve(__dirname, 'SP-24Jul/assets'),
        path.resolve(__dirname, 'SP-24May/assets'),
        path.resolve(__dirname, 'SP-24Oct/assets'),
        path.resolve(__dirname, 'SP-25Aug/assets'),
        path.resolve(__dirname, 'SP-25Jan/assets'),
        path.resolve(__dirname, 'SP-25Mar/assets')
      ],
      issuer: {
        and: [/\.[jt]sx?$/],
      },
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: 'asset/resource',
    });
    return config;
  }
};

module.exports = nextConfig;