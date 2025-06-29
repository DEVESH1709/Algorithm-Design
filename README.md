# Citadel Matching System – Node.js + MongoDB

A backend system for intelligent **profile recommendations** and **dining group matching** based on academic, lifestyle, and behavioral attributes.

---

## Project Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB (local or cloud)
- **Testing:** Postman (API collection)
- **Dev OS:** Windows 10+ (tested on Git Bash or PowerShell)

---

## Setup Instructions (Windows)

### 1. Clone the Repo
```bash
git clone https://github.com/DEVESH1709/Algorithm-Design.git
cd Algorithm-Design.git
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root:

```
MONGO_URI=mongodb://localhost:27017/citadel
PORT=3000
```

### 4. Seed the Database

Run:

```bash
node seed.js
```

This will insert at least 12 sample users to test both algorithms.

### 5. Start the Server

```bash
npm start
```

Server will run at:
`http://localhost:3000`

---

## API Usage with Postman

### 1. Get Next Profile (Profile Discovery)

**Method:** `GET`
**URL:**

```
http://localhost:3000/profiles/<userId>/next
```

# Returns the next best profile for the user based on scoring.

---

### 2. Submit Feedback (Like/Dislike)

**Method:** `POST`
**URL:**

```
http://localhost:3000/profiles/<userId>/feedback
```

**Body (JSON):**

```json
{
  "to": "<userId>",
  "like": true
}
```

##Records a like/dislike and returns the next profile.

---

## 3. Get Dining Groups (Group Matcher)

**Method:** `GET`
**URL:**

```
http://localhost:3000/groups/city
```

# Returns an array of 6-person groups who match on:

* Same city
* Same dietary preference
* Same budget
* Diverse interests

---

## Core Algorithm Design

### 1. Profile Discovery Engine

Recommends profiles using:

* Academic similarity (university, degree)
* Geographic match (city)
* Shared interests
* Feedback-based learning (likes/dislikes)
* Small diversity boost (to avoid identical profiles)
* No randomness (deterministic scoring)

### 2. Group Dining Matcher

Forms groups of 6 using:

* Same city
* Same dietary & budget preferences
* Random shuffle (within constraints) for fairness
* Interest diversity (to spark conversation)

---

## Trade-Offs Made

| Decision                  | Reason                                               |
| ------------------------- | ---------------------------------------------------- |
|  No ML                   | Used rule-based scoring for explainability and speed |
|  Random shuffle          | For fairness in group assignment                     |
|  Strict hard constraints | Ensures comfort (same food/budget)                   |
|  Lightweight algorithms  | Fast under 100ms response time                       |
|  Cosine-style scoring    | Simple, effective for interests                      |

---

## Edge Case Handling

| Scenario                             | Handled by                                       |
| ------------------------------------ | ------------------------------------------------ |
| No more profiles                     | Message: `"No more profiles to show"`            |
| Less than 6 people in a group bucket | Users not grouped                                |
| User likes nobody                    | Feedback adapts slowly; fallback diversity boost |
| Sparse profiles                      | Defaults apply, or excluded from results         |

---

## Logic Soundness

*  No profile is shown twice
*  Feedback influences scoring
*  Group matcher prioritizes comfort + variety
*  Deterministic logic (no surprises or bias)

---

## Monitoring & Deployment Plan

###  Deploy:

* Use PM2 for Windows or `node server.js`
* Use `.env` for secrets
* MongoDB: Local or MongoDB Atlas

### Monitor:

* Add `console.log()` or `winston` logging
* Track: time per API, profile coverage, match success
* Optional: Add REST-based dashboard
