// firebase-init.js
// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = initializeApp(CONFIG.firebase);
const db = getFirestore(app);

// دوال الأكواد
const codesAPI = {
    // إضافة كود جديد
    async addCode(code, seats) {
        try {
            await setDoc(doc(db, "codes", code), {
                code: code,
                seats: seats,
                used: false,
                createdAt: new Date().toISOString()
            });
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },
    
    // الحصول على كود
    async getCode(code) {
        try {
            const docSnap = await getDoc(doc(db, "codes", code));
            if (docSnap.exists()) return docSnap.data();
            return null;
        } catch (e) {
            return null;
        }
    },
    
    // حذف كود
    async deleteCode(code) {
        try {
            await deleteDoc(doc(db, "codes", code));
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },
    
    // الحصول على كل الأكواد
    async getAllCodes() {
        try {
            const snapshot = await getDocs(collection(db, "codes"));
            const codes = {};
            snapshot.forEach(doc => {
                codes[doc.id] = doc.data().seats;
            });
            return codes;
        } catch (e) {
            return {};
        }
    },
    
    // تعليم كود كمستخدم
    async markAsUsed(code) {
        try {
            await updateDoc(doc(db, "codes", code), { used: true });
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};

// دوال المقاعد المفعلة
const seatsAPI = {
    // إضافة مقعد مفعل
    async addSeat(seatNo, activatedBy) {
        try {
            await setDoc(doc(db, "seats", seatNo), {
                seatNo: seatNo,
                activated: true,
                activatedAt: new Date().toISOString(),
                activatedBy: activatedBy || 'unknown'
            });
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },
    
    // التحقق من تفعيل مقعد
    async isSeatActivated(seatNo) {
        try {
            const docSnap = await getDoc(doc(db, "seats", seatNo));
            return docSnap.exists() && docSnap.data().activated === true;
        } catch (e) {
            return false;
        }
    },
    
    // إلغاء تفعيل مقعد
    async deactivateSeat(seatNo) {
        try {
            await updateDoc(doc(db, "seats", seatNo), { activated: false });
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },
    
    // الحصول على كل المقاعد المفعلة
    async getAllActivatedSeats() {
        try {
            const q = query(collection(db, "seats"), where("activated", "==", true));
            const snapshot = await getDocs(q);
            const seats = [];
            snapshot.forEach(doc => seats.push(doc.id));
            return seats;
        } catch (e) {
            return [];
        }
    }
};

// دوال السجلات
const logsAPI = {
    async addLog(log) {
        try {
            const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
            await setDoc(doc(db, "logs", id), log);
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },
    
    async getLogs(limit = 100) {
        try {
            const snapshot = await getDocs(collection(db, "logs"));
            const logs = [];
            snapshot.forEach(doc => logs.push(doc.data()));
            return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);
        } catch (e) {
            return [];
        }
    }
};

export { codesAPI, seatsAPI, logsAPI };
