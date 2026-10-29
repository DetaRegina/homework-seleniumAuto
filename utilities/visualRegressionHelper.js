const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

class VisualRegressionHelper {
    async compareImages(imageName) {
    const baselinePath = path.join(__dirname, `../screenshots/baseline/${imageName}`);
    const currentPath = path.join(__dirname, `../screenshots/current/${imageName}`);

    if (!fs.existsSync(baselinePath)) {
        return { hasBaseline: false, match: false, matchPercentage: 0 };
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));
    const diff = new PNG({ width: baseline.width, height: baseline.height });

    const diffPixels = pixelmatch(
        baseline.data,
        current.data,
        diff.data,
        baseline.width,
        baseline.height,
        { threshold: 0.1 }
    );

    const totalPixels = baseline.width * baseline.height;
    const matchPercentage = ((totalPixels - diffPixels) / totalPixels) * 100;
    const match = diffPixels === 0;

    return { match, diffPixels, matchPercentage, hasBaseline: true };
    }
}

module.exports = VisualRegressionHelper;