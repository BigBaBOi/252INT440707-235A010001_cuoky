/**
 * Precision Lab | Review Management Module
 * Handles moderation logic and persistence.
 */

const REVIEWS_KEY = 'pcweb_reviews';

const DEFAULT_REVIEWS = [
    { id: 101, user: 'John_Dev88', avatar: 'JD', product: 'NVIDIA RTX 4090 FE', content: 'Absolute beast of a card. 4K 144Hz is finally a reality.', status: 'pending', date: '2024-05-10' },
    { id: 102, user: 'HardwareLover', avatar: 'HL', product: 'Ryzen 7 9800X3D', content: 'The V-Cache magic is real. Best gaming CPU I have ever owned.', status: 'pending', date: '2024-05-11' },
    { id: 103, user: 'SilentBuilder', avatar: 'SB', product: 'Noctua NH-D15', content: 'Whisper quiet and keeps my i9 cool. Legend.', status: 'pending', date: '2024-05-12' }
];

function initReviews() {
    if (!localStorage.getItem(REVIEWS_KEY)) {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(DEFAULT_REVIEWS));
    }
}

function getPendingReviews() {
    const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
    return reviews.filter(r => r.status === 'pending');
}

function approveReview(id) {
    const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
    const index = reviews.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
        reviews[index].status = 'approved';
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
        return true;
    }
    return false;
}

function deleteReview(id) {
    let reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
    reviews = reviews.filter(r => r.id !== parseInt(id));
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    return true;
}

// Auto-init on load
initReviews();
