import giveItAway from './red-hot-chili-peppers-give-it-away.mp3';
import acesHigh from './iron-maiden-aces-high.mp3';
import seekAndDestroy from './metallica-seek-and-destroy.mp3';
import neverGonnaGiveYouUp from './rick-astley-never-gonna-give-you-up.mp3';
import welcomeToTheJungle from './guns-n-roses-welcome-to-the-jungle.mp3';

export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

export const tracks: Track[] = [
  {
    id: 'give-it-away',
    title: 'Give It Away',
    artist: 'Red Hot Chili Peppers',
    src: giveItAway,
  },
  {
    id: 'aces-high',
    title: 'Aces High',
    artist: 'Iron Maiden',
    src: acesHigh,
  },
  {
    id: 'seek-and-destroy',
    title: 'Seek & Destroy',
    artist: 'Metallica',
    src: seekAndDestroy,
  },
  {
    id: 'never-gonna-give-you-up',
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    src: neverGonnaGiveYouUp,
  },
  {
    id: 'welcome-to-the-jungle',
    title: 'Welcome to the Jungle',
    artist: "Guns N' Roses",
    src: welcomeToTheJungle,
  },
];

export const tracksById: Record<string, Track> = Object.fromEntries(
  tracks.map((t) => [t.id, t]),
);
