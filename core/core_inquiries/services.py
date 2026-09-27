from datetime import datetime, timedelta


def get_inquiries_context(user):
    now = datetime.now()
    return {
        "conversations": [
            {
                "id": 1,
                "unread_count": 1,
                "other_user": {"display_name": "Julia Santos"},
                "latest_message": {
                    "content": "Hi! I'm interested in applying for the unit you posted. Is it still available?",
                    "created_at": now,
                    "sender_id": 0,
                },
            },
            {
                "id": 2,
                "unread_count": 0,
                "other_user": {"display_name": "Michael Reyes"},
                "latest_message": {
                    "content": "The unit is still available. Let me know if you're free for a viewing this week.",
                    "created_at": now - timedelta(days=1),
                    "sender_id": 0,
                },
            },
        ],
        "requests": [
            {
                "id": 1,
                "status": "pending",
                "listing": {"title": "The Magnolia (Unit 12A)", "address": "Davao City"},
                "created_at": now - timedelta(days=2),
            },
        ],
        "notifications": [
            {
                "id": 1,
                "type": "message",
                "is_read": False,
                "title": "New Inquiry",
                "message": "Julia Santos sent you a message about your inquiry.",
                "created_at": now - timedelta(hours=2),
            },
            {
                "id": 2,
                "type": "site_visit",
                "is_read": False,
                "title": "Site Visit Confirmed",
                "message": "Your site visit for The Magnolia (Unit 12A) is confirmed.",
                "created_at": now - timedelta(hours=3),
            },
        ],
        "unread_notifications_count": 2,
    }