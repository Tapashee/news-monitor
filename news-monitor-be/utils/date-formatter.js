// function formatDate(dateString) {
//     if (!dateString) {
//         return null;
//     }

//     const value = dateString.trim().toUpperCase();

//     // Relative time: "5 MIN", "2 HOURS", "8 HOUR"
//     if (
//         value.includes('MIN') ||
//         value.includes('HOUR') ||
//         value.includes('JUST NOW')
//     ) {
//         return getTodayDate();
//     }

//     // ISO datetime:
//     // "2026-08-19T10:30:00+06:00"
//     if (/^\d{4}-\d{2}-\d{2}T/.test(dateString)) {
//         const date = new Date(dateString);

//         if (!Number.isNaN(date.getTime())) {
//             return formatToDateOnly(date);
//         }
//     }

//     // "17 August, 2026, 10:00 am"
//     const dateWithComma = dateString.match(
//         /^(\d{1,2})\s+([A-Za-z]+),\s+(\d{4})/
//     );

//     if (dateWithComma) {
//         const [, day, monthName, year] = dateWithComma;

//         const months = {
//             january: 0,
//             february: 1,
//             march: 2,
//             april: 3,
//             may: 4,
//             june: 5,
//             july: 6,
//             august: 7,
//             september: 8,
//             october: 9,
//             november: 10,
//             december: 11,
//         };

//         const month = months[monthName.toLowerCase()];

//         if (month !== undefined) {
//             const date = new Date(
//                 Number(year),
//                 month,
//                 Number(day)
//             );

//             return formatToDateOnly(date);
//         }
//     }

//     const dateWithWeekday = dateString.match(
//         /^[A-Za-z]+,\s+(\d{1,2})\s+([A-Za-z]+),\s+(\d{4})/
//     );

//     // Wednesday, 2 September, 2026 at 6:06 PM
//     if (dateWithWeekday) {
//         const [, day, monthName, year] = dateWithWeekday;

//         const months = {
//             january: 0,
//             february: 1,
//             march: 2,
//             april: 3,
//             may: 4,
//             june: 5,
//             july: 6,
//             august: 7,
//             september: 8,
//             october: 9,
//             november: 10,
//             december: 11,
//         };

//         const month = months[monthName.toLowerCase()];

//         if (month !== undefined) {
//             const date = new Date(
//                 Number(year),
//                 month,
//                 Number(day)
//             );

//             return formatToDateOnly(date);
//         }
//     }

//     // "10 August 2026"
//     const date = new Date(dateString);

//     if (!Number.isNaN(date.getTime())) {
//         return formatToDateOnly(date);
//     }

//     return null;

    
// }

// function getTodayDate() {
//     const today = new Date();

//     return formatToDateOnly(today);
// }

// function formatToDateOnly(date) {
//     return [
//         date.getFullYear(),
//         String(date.getMonth() + 1).padStart(2, '0'),
//         String(date.getDate()).padStart(2, '0'),
//     ].join('-');
// }

// // console.log(formatDate('5 MIN')); // Should return today's date in YYYY-MM-DD format
// // console.log(formatDate('2 HOURS')); // Should return today's date in YYYY-MM-DD format
// // console.log(formatDate('10 August 2026')); // Should return '2026-08-10'

// module.exports = {
//     formatDate
// };

function formatDate(dateString) {
    if (!dateString) {
        return null;
    }

    const value = String(dateString).trim();
    const upperValue = value.toUpperCase();

    // Relative time:
    // "5 MIN", "2 HOURS", "8 HOUR", "JUST NOW"
    if (
        upperValue.includes('MIN') ||
        upperValue.includes('HOUR') ||
        upperValue.includes('JUST NOW')
    ) {
        return getTodayDate();
    }

    // ISO datetime:
    // "2026-08-19T10:30:00+06:00"
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
        const date = new Date(value);

        if (!Number.isNaN(date.getTime())) {
            return formatToDateOnly(date);
        }
    }

    const months = {
        january: 0,
        february: 1,
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
        august: 7,
        september: 8,
        october: 9,
        november: 10,
        december: 11,
    };

    // "17 August, 2026, 10:00 am"
    const dateWithComma = value.match(
        /^(\d{1,2})\s+([A-Za-z]+),\s*(\d{4})/
    );

    if (dateWithComma) {
        const [, day, monthName, year] = dateWithComma;

        const month = months[monthName.toLowerCase()];

        if (month !== undefined) {
            return formatToDateOnly(
                new Date(
                    Number(year),
                    month,
                    Number(day)
                )
            );
        }
    }

    // "Wednesday, 2 September, 2026 at 6:06 PM"
    const dateWithWeekday = value.match(
        /^[A-Za-z]+,\s+(\d{1,2})\s+([A-Za-z]+),\s+(\d{4})/
    );

    if (dateWithWeekday) {
        const [, day, monthName, year] = dateWithWeekday;

        const month = months[monthName.toLowerCase()];

        if (month !== undefined) {
            return formatToDateOnly(
                new Date(
                    Number(year),
                    month,
                    Number(day)
                )
            );
        }
    }

    // "04 Sep 2026 10:45 PM"
    // "2 September 2026 6:06 PM"
    const dateWithTime = value.match(
        /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/
    );

    if (dateWithTime) {
        const [, day, monthName, year] = dateWithTime;

        const month = months[monthName.toLowerCase()];

        if (month !== undefined) {
            return formatToDateOnly(
                new Date(
                    Number(year),
                    month,
                    Number(day)
                )
            );
        }

        // Handle abbreviated month names: Jan, Feb, Mar, etc.
        const shortMonth = monthName
            .toLowerCase()
            .substring(0, 3);

        const monthIndex = Object.keys(months).find(
            month => month.substring(0, 3) === shortMonth
        );

        if (monthIndex) {
            return formatToDateOnly(
                new Date(
                    Number(year),
                    months[monthIndex],
                    Number(day)
                )
            );
        }
    }

    // "10 August 2026"
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
        return formatToDateOnly(date);
    }

    return null;
}

function getTodayDate() {
    const today = new Date();

    return formatToDateOnly(today);
}

function formatToDateOnly(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-');
}

module.exports = {
    formatDate
};
