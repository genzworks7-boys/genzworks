// src/teamImages.js
// Automatic local image loader for GenzWorks Team
// 
// 1. You can drop your image files directly into:
//    src/assets/team/
//    with ANY of these file names:
//    - team-1.jpg / mohammed.jpg / ali.jpg       -> Mohammed Ali Khan (Team Lead)
//    - team-2.jpg / paul.jpg / joel.jpg           -> Paul Joel (Backend)
//    - team-3.jpg / esakki.jpg                    -> Esakki (Fullstack)
//    - team-4.jpg / kishore.jpg                   -> Kishore (QA Lead)
//    - team-5.jpg / pranav.jpg                    -> Pranav Deepak (Research)
//    - team-6.jpg / muthu.jpg / sanjay.jpg        -> Muthu Sanjay Kumar (Creative Media)
//    - team-7.jpg / jayasolomon.jpg / solomon.jpg -> Jayasolomon (DevOps)
//
// 2. OR you can upload directly via the website using the "Photo" button!
//    Any image uploaded via the UI is automatically converted to Base64 and LOCKED permanently in localStorage!

// Eagerly import all images inside src/assets/team/
const localAssets = import.meta.glob('./assets/team/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}', {
  eager: true,
  import: 'default'
});

// Build a clean lookup map from file basenames (e.g. "team-1" -> imported asset url)
const assetMap = {};
for (const path in localAssets) {
  const match = path.match(/\/([^/]+)\.[^.]+$/);
  if (match && match[1]) {
    const key = match[1].toLowerCase().trim();
    assetMap[key] = localAssets[path];
  }
}

// Aliases mapping for easy file naming
const MEMBER_ALIASES = {
  'team-1': ['team-1', 'team1', '1', 'mohammed', 'ali', 'khan', 'lead', 'teamlead'],
  'team-2': ['team-2', 'team2', '2', 'paul', 'joel', 'backend'],
  'team-3': ['team-3', 'team3', '3', 'esakki', 'fullstack'],
  'team-4': ['team-4', 'team4', '4', 'kishore', 'qa', 'qalead'],
  'team-5': ['team-5', 'team5', '5', 'pranav', 'deepak', 'research'],
  'team-6': ['team-6', 'team6', '6', 'muthu', 'sanjay', 'multimedia', 'creative'],
  'team-7': ['team-7', 'team7', '7', 'jayasolomon', 'solomon', 'devops']
};

export const STORAGE_KEY = 'genzworks_team_photos';

// Get saved photo overrides from localStorage
export function getSavedPhotos() {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error reading saved team photos:', e);
    return {};
  }
}

// Lock a photo into localStorage
export function lockPhoto(id, photoUrlOrBase64) {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedPhotos();
    current[id] = photoUrlOrBase64;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error locking team photo:', e);
  }
}

// Remove locked photo (reset to local file or default)
export function resetPhoto(id) {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedPhotos();
    delete current[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error resetting team photo:', e);
  }
}

// Resolve final photo (plus pre-baked grayscale variant for 0-filter GPU scroll) for a member
export function resolveMemberPhoto(memberId, defaultFallbackUrl) {
  // 1. Check if user locked a photo in localStorage (via UI upload or URL)
  const saved = getSavedPhotos();
  if (saved && saved[memberId]) {
    return { photo: saved[memberId], grayPhoto: null, isLocked: true, source: 'localStorage' };
  }

  // 2. Check if an image was placed in src/assets/team/ (checking aliases)
  const aliases = MEMBER_ALIASES[memberId] || [memberId.toLowerCase()];
  for (const alias of aliases) {
    if (assetMap[alias]) {
      return {
        photo: assetMap[alias],
        grayPhoto: assetMap[`${alias}-gray`] || null,
        isLocked: false,
        source: 'src/assets'
      };
    }
  }

  // 3. Fallback to default URL
  return { photo: defaultFallbackUrl, grayPhoto: null, isLocked: false, source: 'default' };
}
