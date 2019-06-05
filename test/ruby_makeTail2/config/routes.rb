Rails.application.routes.draw do
  get 'makeyourowns/makeyourown'
  get 'makeyourowns/recommendation'
  get 'makeyourowns/gallery'
  root 'welcome#index'
  get 'welcome/index'
  resources :images
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
