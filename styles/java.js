document.addEventListener("DOMContentLoaded", function () {
    let selectedSeats = [];
    let originalPrice = 0;
   

    const seatPrice = 550;

    const seatButtons = document.querySelectorAll(".moddi");

    function updateSeatContainer() {
        const seatContainer = document.getElementById("seat-green");
        seatContainer.innerHTML = "";

        const seatInfoSection = document.createElement("div");
        seatInfoSection.className = "flex justify-between text-xl border-dashed border-b-2 pb-5";

        const seatAdded = document.createElement("p");
        seatAdded.innerHTML = "Seat <span id='seat-added' class='bg-green-400 p-1 rounded-xl'>" + selectedSeats.length + "</span>";

        seatInfoSection.appendChild(seatAdded);

        seatContainer.appendChild(seatInfoSection);

        originalPrice = selectedSeats.length * seatPrice;

        document.getElementById("total-price").textContent = originalPrice;
        updateGrandTotal();
    }

    function updateSeatClassPrice(seat) {
        const seatClassPrice = document.getElementById("seat-container");

        
        const existingSeat = document.getElementById("seat-" + seat);
        if (existingSeat) {
            existingSeat.remove();
        } 
        else {
            const seatClassPriceItem = document.createElement("div");
            seatClassPriceItem.id = "seat-" + seat;
            seatClassPriceItem.className = "flex justify-between text-xl border-dashed border-b-2 pb-4";
            
            seatClassPriceItem.innerHTML = "<p id='seat'>" + seat + "</p><p id='economy'>economy</p><p id='550'>" + seatPrice + "</p>";
            seatClassPrice.appendChild(seatClassPriceItem);
        }
    }
    const maxSeats = 4;
    function handleSeatClick(seat) {
        const seatIndex = selectedSeats.indexOf(seat);

        if (seatIndex === -1 && selectedSeats.length < maxSeats) {
            selectedSeats.push(seat);
            document.getElementById(seat).classList.add("bg-green-400");

            const seatsLeftElement = document.getElementById("seats-left");
            if (seatsLeftElement) {
                seatsLeftElement.textContent = parseInt(seatsLeftElement.textContent) - 1;
            }

            updateSeatContainer();
            updateSeatClassPrice(seat);
        } 
        else if (seatIndex !== -1) {
            selectedSeats.splice(seatIndex, 1);
            document.getElementById(seat).classList.remove("bg-green-400");

            const seatsLeftElement = document.getElementById("seats-left");
            if (seatsLeftElement) {
                seatsLeftElement.textContent = parseInt(seatsLeftElement.textContent) + 1;
            }

            updateSeatContainer();
            updateSeatClassPrice(seat);
        }
         else {
            alert('max select seat number is 4');
        }
    }
    let discount = 0;
    function handleCouponApply() {
        const couponInput = document.getElementById("coupon-input");
        const couponCode = couponInput.value.trim();

        if (couponCode === 'NEW15') {
            discount = Math.round((originalPrice * 15) / 100);
            couponInput.disabled = true;
            document.getElementById("coupon-apply-button").style.display = "none";

        }
         else if (couponCode === 'Couple 20') {
            discount = Math.round((originalPrice * 20) / 100);
            couponInput.disabled = true;
            document.getElementById("coupon-apply-button").style.display = "none";

        } 
        else {
            discount = 0;
            alert('Enter a corrected coupon code ');
        }

        updateGrandTotal();
    }

    function updateGrandTotal() {
        const grandTotal = originalPrice - discount;
        document.getElementById("grand-total").textContent = grandTotal;
    }

    for (const button of seatButtons) {
        button.addEventListener("click", function () {
            handleSeatClick(button.id);
        });
    }

    document.getElementById("coupon-apply-button").addEventListener("click", handleCouponApply);
});

