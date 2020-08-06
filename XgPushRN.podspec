require 'json'
pjson = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|

  s.name            = "XgPushRN"
  s.version         = pjson["version"]
  s.homepage        = pjson["homepage"]
  s.summary         = pjson["description"]
  s.license         = pjson["license"]
  s.author          = pjson["author"]
  
  s.ios.deployment_target = '8.0'

  s.source          = { :git => "https://git.code.tencent.com/tpns/XG-RN-Plugin.git" }
  s.source_files    = 'ios/RCTXgPushModule/RCTXgPushModule/*.{h,m}','ios/RCTXgPushModule/RCTXgPushModule/sdk/*.{h}'
  s.preserve_paths  = "*.js"
  s.frameworks      = 'UIKit','CoreTelephony','CoreData','SystemConfiguration','Foundation','CFNetwork'
  s.weak_frameworks = 'UserNotifications'
  s.libraries       = 'z','resolv'
  s.vendored_libraries = "ios/RCTXgPushModule/RCTXgPushModule/sdk/*.a","ios/RCTXgPushModule/RCTXgPushModule/sdk/idfa/*.a","ios/RCTXgPushModule/RCTXgPushModule/sdk/extesion/*.a"
  s.vendored_frameworks = "ios/RCTXgPushModule/RCTXgPushModule/sdk/XGPushStatistics/XGMTACloud.framework"

  s.dependency 'React'
end
