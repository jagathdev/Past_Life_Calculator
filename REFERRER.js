
<script>
    document.addEventListener("DOMContentLoaded", function() {

    const forms = document.querySelectorAll("form");

    if (!forms.length) return;

    const urlParams = new URLSearchParams(window.location.search);

    const utmFields = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_id",
    "utm_term",
    "utm_content"
    ];

    forms.forEach(function(form) {

        utmFields.forEach(function (field) {

            const value = urlParams.get(field);

            if (value) {

                if (!form.querySelector('#' + field)) {

                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = field;
                    input.id = field;
                    input.value = value;

                    form.appendChild(input);
                }
            }
        });
    });
});


    function loadReferralUrl() {

    /* =====================
    PROMO CONFIGURATION
    ====================== */

    const protectedPromoCodes = [
    "AVAPP",
    "PUSH",
    "SMO",
    "GAP",
    "NLW",
    "NLI"
    ];

    function isSLHomePromo(promo) {
        return !!promo &&
    promo.toUpperCase().startsWith("SL_HOME");
    }

    function isProtectedPromo(promo) {

        if (!promo) return false;

    const normalizedPromo = promo.trim().toUpperCase();

    return protectedPromoCodes.some(function(code) {
            return normalizedPromo.startsWith(code);
        });
    }


    /* =====================
       COOKIE HELPERS
    ====================== */

    function isUrlLike(val) {
        return /^https?:\/\//i.test(val);
    }

    function isSamePromoFamily(existing, incoming) {
        if (!existing || !incoming) return false;

    return existing.startsWith("SL_") &&
    incoming.startsWith("SL_HOME_");
    }

    function getCookie(name) {

        let match = document.cookie.match(
    new RegExp('(^|; )' + name + '=([^;]*)')
    );

    if (!match) return "";

    try {
            return decodeURIComponent(match[2]);
        } catch (e) {
            return match[2];
        }
    }

    function setCookie(name, value, days) {

        let expires = "";

    if (days) {
        let d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    expires = "; expires=" + d.toUTCString();
        }

    const storeValue = isUrlLike(value)
    ? value
    : encodeURIComponent(value || "");

    document.cookie =
    name + "=" + storeValue + expires + "; path=/";
    }


    /* =====================
       REFERRER HELPERS
    ====================== */

    function isInternalReferrer(ref) {

        if (!ref) return false;

    try {
            return /(^|\.)astroved\.com$/i.test(
    new URL(ref).hostname
    );
        } catch (e) {
            return false;
        }
    }


    /* =====================
       READ VALUES
    ====================== */

    const params = new URLSearchParams(window.location.search);

    const promo = params.get("promo") || "";
    const utmSource = params.get("utm_source") || "";

    const referrer = document.referrer || "";

    const referralLevel1 = getCookie("referralLevel1");
    const referralLevel2 = getCookie("referralLevel2");

    const isInternal = isInternalReferrer(referrer);

    // UTM source always forces EXTERNAL behaviour
    const isExternal =
    !!utmSource || (!!referrer && !isInternal);


    /* =====================
       DEBUG LOGS
    ====================== */

    // console.log("Incoming Promo:", promo);
    // console.log("Referrer:", referrer);
    // console.log("Is Internal:", isInternal);
    // console.log("Is External:", isExternal);
    // console.log("Current Level 1:", referralLevel1);
    // console.log("Current Level 2:", referralLevel2);


    /* =====================
       SL_HOME PRIORITY RULE 1

       Internal homepage banner click

       If Level 1 contains one of
       six protected promo families:
       DO NOT replace it.

       Otherwise:
       SL_HOME replaces Level 1.
    ====================== */

    if (promo && isSLHomePromo(promo) && isInternal) {

        if (isProtectedPromo(referralLevel1)) {

        console.log(
            "SL_HOME BLOCKED: Protected promo exists in Level 1"
        );

    return;
        }

    setCookie("referralLevel1", promo, 3);

    console.log(
    "SL_HOME UPDATED: Referral Level 1"
    );

    return;
    }


    /* =====================
       SL_HOME PRIORITY RULE 2

       External protected promo arrives
       while Level 1 contains SL_HOME.

       Only six protected promo families
       can replace SL_HOME.

       Other external promos:
       Keep SL_HOME.
    ====================== */

    if (
    promo &&
    isExternal &&
    isSLHomePromo(referralLevel1)
    ) {

        if (isProtectedPromo(promo)) {

        setCookie("referralLevel1", promo, 3);

    console.log(
    "EXTERNAL PROTECTED PROMO REPLACED SL_HOME"
    );

        } else {

        console.log(
            "SL_HOME PROTECTED: External promo ignored"
        );
        }

    return;
    }


    /* =====================
       TEMP FIX

       Promo exists but browser
       did not send a referrer.

       Example: Gmail / React homepage.
    ====================== */

    if (promo && !referrer) {

        // Protected promo can replace SL_HOME
        if (
    isSLHomePromo(referralLevel1) &&
    isProtectedPromo(promo)
    ) {

        setCookie("referralLevel1", promo, 3);

    console.log(
    "NO REFERRER: Protected promo replaced SL_HOME"
    );

    return;
        }

    // SL_HOME must not replace protected promo
    if (
    isSLHomePromo(promo) &&
    isProtectedPromo(referralLevel1)
    ) {

        console.log(
            "NO REFERRER: SL_HOME blocked by protected promo"
        );

    return;
        }

    // If no Level 1, create it
    if (!referralLevel1 || utmSource) {

        setCookie("referralLevel1", promo, 3);
    return;
        }

    // Replace Level 1 when switching within same SL family
    if (isSamePromoFamily(referralLevel1, promo)) {

        setCookie("referralLevel1", promo, 3);
    return;
        }

    // Otherwise use Level 2
    if (!utmSource && promo !== referralLevel1) {

        setCookie("referralLevel2", promo, 3);
        }

    return;
    }


    /* =====================
       EXISTING LOGIC 1

       First external visit, no cookies
    ====================== */

    if (!referralLevel1 && isExternal && !promo) {

        setCookie("referralLevel1", referrer, 3);
    return;
    }


    /* =====================
       EXISTING LOGIC 2

       External visit WITHOUT promo
    ====================== */

    if (isExternal && !promo) {

        // If Level 1 already contains a PROMO, do NOTHING
        if (referralLevel1 && !isUrlLike(referralLevel1)) {
            return;
        }

    // Otherwise overwrite Level 1 with new organic source
    setCookie("referralLevel1", referrer, 3);
    return;
    }


    /* =====================
       EXISTING LOGIC 5 & 6

       External visit WITH promo

       Always overwrite Level 1,
       except SL_HOME protection handled above.
    ====================== */

    if (isExternal && promo) {

        setCookie("referralLevel1", promo, 3);
    return;
    }


    /* =====================
       EXISTING LOGIC 3, 4 & 7

       Internal site navigation WITH promo
    ====================== */

    if (isInternal && promo) {

        // If Level 1 is EMPTY
        if (!referralLevel1) {

        setCookie("referralLevel1", promo, 3);
    return;
        }

    // Existing SL promo family logic
    if (isSamePromoFamily(referralLevel1, promo)) {

        setCookie("referralLevel1", promo, 3);
    return;
        }

    // Otherwise update Level 2 only
    if (promo !== referralLevel1) {

        setCookie("referralLevel2", promo, 3);
        }

    return;
    }


    /* =====================
       OTHERWISE DO NOTHING
    ====================== */

}
</script>
