import { NowRequest, NowResponse } from '@vercel/node';

import { connectToDatabase } from '@lib/mongodb';
import { getLevelUpThumbnailTemplate } from '@lib/thumbnailTemplates/levelUpThumbnailTemplate';
import { getScreenshot } from '@lib/chromium';
import { ObjectId } from 'mongodb';

export default async function thumbnail(req: NowRequest, res: NowResponse) {
  try {
    const userId = String(req.query.id);

    if (!userId) {
      return res.status(400).json({
        error: 'UserId is required.'
      });
    }

    const { db } = await connectToDatabase();

    const usersCollection = db.collection('users');
    const challengesCollection = db.collection('challenges');

    const user = await usersCollection.findOne({
      _id: new ObjectId(userId)
    });

    if (!user) {
      return res.status(400).json({
        error: 'User does not exists.'
      });
    }

    const challenge = await challengesCollection.findOne({
      $where: () => {
        this.user.id === userId
      }
    });

    const { level, challengesCompleted, currentExperience } = challenge;

    const html = getLevelUpThumbnailTemplate(
      level, 
      challengesCompleted, 
      currentExperience
    );

    const file = await getScreenshot(html);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000');

    return res.end(file);
  } catch(err) {
    console.log(err);

    return res.status(500).send("Internal Server Error.");
  }
}