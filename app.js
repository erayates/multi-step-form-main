// Steps

const step1 = document.querySelector('.step-1')
const step2 = document.querySelector('.step-2')
const step3 = document.querySelector('.step-3')
const step4 = document.querySelector('.step-4')
const step5 = document.querySelector('.step-5')

// Buttons
const step1Btn = document.querySelector('.step-1__button')
const step2BackBtn = document.querySelector('.step-2__btn__back')
const step2NextBtn = document.querySelector('.step-2__btn__next')
const step3BackBtn = document.querySelector('.step-3__btn__back')
const step3NextBtn = document.querySelector('.step-3__btn__next')
const step4BackBtn = document.querySelector('.step-4__btn__back')
const step4NextBtn = document.querySelector('.step-4__btn__next')


// Inputs
const name = document.querySelector('#fullname')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone_number')

// Plan Divs
const plan1 = document.querySelector('#plan-1')
const plan2 = document.querySelector('#plan-2')
const plan3 = document.querySelector('#plan-3')

// Addon Divs
const addon1 = document.getElementById('step-3__addon-1')
const addon2 = document.getElementById('step-3__addon-2')
const addon3 = document.getElementById('step-3__addon-3')

addon1Checkbox = addon1.childNodes[1].childNodes[1].checked
addon2Checkbox = addon2.childNodes[1].childNodes[1].checked
addon3Checkbox = addon3.childNodes[1].childNodes[1].checked


// Addon Checkboxes



// Plans
const plans = {
    'arcade':{
        'title': 'Arcade',
        'price': 9,
    },
    'advanced':{
        'title': 'Advanced',
        'price': 12
    },
    'pro': {
        'title': 'Pro',
        'price': 15
    }
}

// Add-ons
const addons = {
    'addon1':{
        'title': 'Online Service',
        'description': 'Access to multiplayer games',
        'price': 1
    },
    'addon2':{
        'title': 'Larger Storage',
        'description': 'Extra 1TB of cloud save',
        'price': 2
    },
    'addon3':{
        'title': 'Customizable Profile',
        'description': 'Custom theme on your profile',
        'price': 2
    }
}

var selected_plan = ''
var selected_addons = []
var receipt = []




step2.classList.add('hidden')
step3.classList.add('hidden')
step4.classList.add('hidden')
step5.classList.add('hidden')

// Click next button event for each step

step1Btn.addEventListener('click', () => {
    if(isInputsEmpty(fullname,email,phone)) {
        alert('Please fill in all fields')
    }else{
        step1.classList.toggle('hidden')
        step2.classList.toggle('hidden')        
    }

})

step2NextBtn.addEventListener('click', () => {
    if(selected_plan !== ''){
        if(selected_plan === 'arcade'){
            receipt.push(plans.arcade)
        }else if(selected_plan === 'advanced'){
            receipt.push(plans.advanced)
        }else if(selected_plan === 'pro'){
            receipt.push(plans.pro)
        }
        step2.classList.toggle('hidden')
        step3.classList.toggle('hidden')
    }else{
        alert('Please select a plan.')
    }
})

step3NextBtn.addEventListener('click', () => {
    selected_addons = []
    addon1Checkbox = addon1.childNodes[1].childNodes[1].checked
    addon2Checkbox = addon2.childNodes[1].childNodes[1].checked
    addon3Checkbox = addon3.childNodes[1].childNodes[1].checked

    addon1Checkbox ? selected_addons.push(addons.addon1) : ''
    addon2Checkbox ? selected_addons.push(addons.addon2) : ''
    addon3Checkbox ? selected_addons.push(addons.addon3) : ''
    
    if(selected_addons.length != 0){
        
        step3.classList.toggle('hidden')
        step4.classList.toggle('hidden')
        receipt.push(selected_addons)
        checkReceipt()

    }else{
        alert('Please select at least one add-on')
    }



})

step4NextBtn.addEventListener('click', () => {
    step4.classList.toggle('hidden')
    step5.classList.toggle('hidden')
})



// Click back button event for each step
step2BackBtn.addEventListener('click', () => {
    step2.classList.toggle('hidden')
    step1.classList.toggle('hidden')
  
})

step3BackBtn.addEventListener('click', () => {
    step3.classList.toggle('hidden')
    step2.classList.toggle('hidden')
    receipt.pop()
    
})

step4BackBtn.addEventListener('click', () => {
    step4.classList.toggle('hidden')
    step3.classList.toggle('hidden')
    receipt.pop()
})

// Plan Selection
plan1.addEventListener('click', () => {
    plan1.classList.add('plan__selected')
    plan2.classList.remove('plan__selected')
    plan3.classList.remove('plan__selected')
    selected_plan = 'arcade'
})

plan2.addEventListener('click', () => {
    plan1.classList.remove('plan__selected')
    plan2.classList.add('plan__selected')
    plan3.classList.remove('plan__selected')
    selected_plan = 'advanced'
})

plan3.addEventListener('click', () => {
    plan1.classList.remove('plan__selected')
    plan2.classList.remove('plan__selected')
    plan3.classList.add('plan__selected')
    selected_plan = 'pro'
})

// Addons Selection
addon1.addEventListener('click', () => {
    addon1.classList.toggle('addon__selected')
    addon1.childNodes[1].childNodes[1].checked = !addon1.childNodes[1].childNodes[1].checked
})

addon2.addEventListener('click', () => {
    addon2.classList.toggle('addon__selected')
    addon2.childNodes[1].childNodes[1].checked = !addon2.childNodes[1].childNodes[1].checked
}) 

addon3.addEventListener('click', () => {
    addon3.classList.toggle('addon__selected')
    addon3.childNodes[1].childNodes[1].checked = !addon3.childNodes[1].childNodes[1].checked
})    


// Step-2 Checkbox




// Associative Functions
const isInputsEmpty = (name,email,phone) => {
    if(name.value === '' || email.value === '' || phone.value === ''){
        return true
    }else{
        return false
    }
}

const checkReceipt = () => {
    const receiptPlanTitle = document.querySelector('.step-4__summary__details-title')
    const receiptPlanPrice = document.querySelector('.step-4__summary__details-price')
    const receiptAddons = document.querySelector('.step-4__summary-selected-addons')
    const receiptPrice = document.querySelector('.step-4__summary__total-price-price')

    const totalPrice = receipt[0].price + receipt[1].reduce((acc,addon) => acc + addon.price,0)

    receiptPlanTitle.innerHTML = receipt[0].title
    receiptPlanPrice.innerHTML = `$${receipt[0].price}/mo`

    receipt[1].map(addon => {
        const addonItem = `
            <div class="step-4__selected-addons">
                <h3 class="step-4__selected-addon-title">${addon.title}</h3>
                <p class="step-4__selected-addon-price">+$${addon.price}/mo</p>
            </div>
        `
        receiptAddons.innerHTML += addonItem
    })
    receiptPrice.innerHTML = `$${totalPrice}/mo`

}
