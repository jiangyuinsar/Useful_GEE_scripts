/*
Характеристики каналов в виде графика
https://landsat.gsfc.nasa.gov/sentinel-2a-launches-our-compliments-our-complements/

Copernicus Sentinel-2A Calibration and Products Validation Status (есть описание уровней обработки)
https://www.mdpi.com/2072-4292/9/6/584/htm

Каналы нужно выкинуть из выборки:
B1 (Aerosols)
B9 (Water vapor), 
B10 (Cirrus)  
QA10 - Always empty
QA20 - Always empty
QA60 - Cloud mask

Они грубого разрешения для атмоферы или использовать их для атмосферной коррекции.

*/


Map.setOptions("HYBRID");

// +++++++++++++++  SET AOI +++++++++++++++ //

var geometry_v2 = ee.Geometry.Polygon(
  [[[28.96069316126369841,48.75970490326810136], [29.07157926291939987,48.76014128419699745], [29.07724331602580037,48.74927831128729849], [29.09460683293789884,48.73308419100190036], [29.09934900700899973,48.73065537421310012], [29.10391634796519966,48.73072107413919696], [29.1092160642369997,48.7296967171068971], [29.11964143242320091,48.72667179987679731], [29.1270935456177007,48.72456642063129806], [29.1333239554153991,48.72338758240189804], [29.13675570073520049,48.72091124217200075], [29.15150639701129975,48.70832058344669946], [29.16407623401800109,48.70231860413530001], [29.17191294962150039,48.70484073607210007], [29.17537178498270123,48.70724467604580354], [29.17538376998620109,48.71314954452159895], [29.17809127395209856,48.71547761503960317], [29.18304306884920152,48.71682542799779725], [29.18961866310399955,48.71512344892769875], [29.20247099863900075,48.71547373189159913], [29.21984330891350012,48.71074211539610133], [29.23554714735740134,48.70326581177800307], [29.23749146440919944,48.70020086086660172], [29.23714292077890065,48.69613084816400317], [29.23822771073599824,48.69441529908900179], [29.24126590566200079,48.69377237962579841], [29.24497046836640024,48.69398951613339932], [29.24684744638500078,48.69323312718609742], [29.24781297593469986,48.68978615090549766], [29.24915044363130079,48.68831961521880203], [29.25286290562040037,48.68786914745260219], [29.26085950852069928,48.68384382952540079], [29.26689075009780083,48.68156514995669681], [29.27352654279109956,48.67941939118159667], [29.27706869925230038,48.67521065737049923], [29.27947522509170142,48.67349710067480117], [29.28760007876820026,48.67145362730060043], [29.29430375584410129,48.6683977805703023], [29.29702758759309944,48.66779392787599789], [29.29868282064699869,48.66533033882920023], [29.30151578970129833,48.66469546387529732], [29.30468474652790078,48.66447187369030303], [29.30669673108659978,48.66326157954050302], [29.30608098439919829,48.65869142715010298], [29.3042471468728003,48.65633940777699706], [29.30368182439470104,48.65360268706820079], [29.30767399502559911,48.64691545479799828], [29.31033480437890049,48.64230076253490154], [29.31066573098129879,48.6374850872202984], [29.30785152251409897,48.63528300474590083], [29.30725125523809993,48.63401289178489861], [29.31062327101239973,48.62868299080400192], [29.31638792684830008,48.62743025032909827], [29.31874416582819975,48.62338672097259717], [29.31559706454400072,48.62014364590159943], [29.31064871478729827,48.61752975869080018], [29.30576023226689841,48.61117416639510225], [29.30214651882009846,48.60669158484510177], [29.31128703967419824,48.59364547016119928], [29.31841703055750159,48.59260219630360211], [29.31894460592589979,48.58945990331120157], [29.32015802163320117,48.58203539233129931], [29.36851100569300144,48.5499063819339014], [29.3932120536326984,48.52338894554569748], [29.38885218812389866,48.5168625789401986], [29.38138610910419857,48.52131109597750225], [29.37955765070210035,48.52410213552690266], [29.37216226838599908,48.52462976303510089], [29.36556891281960091,48.52610465505789961], [29.3571530598422008,48.52744721645620274], [29.34974165920419864,48.52840915042990133], [29.34826421995590096,48.5263894761716017], [29.3404219919230016,48.52740790005739768], [29.33243552508319851,48.52958379154600266], [29.3293077159988016,48.5278832287689994], [29.3207022529965009,48.52545871676579736], [29.3129987465255013,48.52851231642200247], [29.30882249851359944,48.5252642479324976], [29.31412837329200016,48.52371508027140123], [29.31910196599260132,48.51902063012680344], [29.31357815687620061,48.51711995174839842], [29.30640021605830015,48.51519314200739785], [29.29841814567659952,48.51985907988989766], [29.28924350369059937,48.52266695270839847], [29.28499066953299845,48.52199087253590193], [29.27528555081699935,48.51972544665660081], [29.27177554353929878,48.51861940212840096], [29.27035937754619965,48.51416427308760149], [29.26712013422709902,48.51360573082759942], [29.26111458392280085,48.51371458880699805], [29.24911213482500116,48.51081120476779773], [29.2424448355397999,48.51193439569460253], [29.21057646096560134,48.50774311434250308], [29.19521116074179901,48.51106343197719895], [29.15556344457780114,48.51865843179940185], [29.11572282471350093,48.52609515616399705], [29.08660589945949937,48.53359734806050341], [29.06043834525760161,48.53787963673730133], [29.03283166275179994,48.53751289954689696], [29.01052928622110016,48.54060495359310323], [28.99720799376000002,48.5438435651188982], [28.9795519550590015,48.54196814452350139], [28.95936623227730067,48.54088423231809912], [28.96069316126369841,48.75970490326810136]]]);

var geometry_v3 = ee.Geometry.Polygon(
  [[[27.89413530009574,48.74059247224125],
    [28.140641037400428,48.74059247224125],
    [28.140641037400428,48.869029323773056],
    [27.89413530009574,48.869029323773056],
    [27.89413530009574,48.74059247224125]]]);

// ### > > >  ! ! ! Укажите номер участка 2 или 3 для корректной подписи результрующих файлов ! ! ! <<< ###

var num_area = 3;

// ### > > > ВЫБЕРИ вариант зоны интереса 2 или 3

// var geometry = geometry_v2
 var geometry = geometry_v3

var AOI = ee.FeatureCollection([ee.Feature(geometry, {name: 'vin 3'})]);

Map.centerObject(geometry, 12);

// --------------- end ---------------//

var year = 2018

var STARTDAY=91;///julian number of start day
var ENDDAY=258;

var cloud_treshold=70;

// var INTERVAL=ENDDAY-STARTDAY; //days

// var cloud_treshold=10;


/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
//  return image.updateMask(mask).divide(10000); // если делить на 10000 то результирующий растр будет в долях еденицы.
  
}

// Map the function over one year of data and take the median.
// Load Sentinel-2 atmospherically corrected surface reflectance data Level-2A .
// https://explorer.earthengine.google.com/#detail/COPERNICUS%2FS2_SR
// https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR


var dataset_2a = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(AOI)
                  .filter(ee.Filter.calendarRange(year, year, 'year'))
                  .filter(ee.Filter.dayOfYear(STARTDAY, ENDDAY))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloud_treshold))
                  .map(maskS2clouds)
                  .select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12']);
   
    print(year);
    print(dataset_2a);
    print('Number of Scenes', dataset_2a.size());
    
var med_dataset_2a = dataset_2a.median().uint16();


var rgbVis_natural_color = {
  min: 0,
  max: 1500,
  bands: ['B4', 'B3', 'B2'],
};

var rgbVis_Color_Infrared = {
  min: 0,
  max: 5000,
  bands: ['B8', 'B4', 'B3'],
};

var rgbVis_False_color = {
  min: 0,
  max: 5000,
  bands: ['B11', 'B8', 'B4'],
};

// >>>   НА КАРТЕ ПОДКЛЮЧЕНО НЕСКОЛЬКО СЛОЕВ

Map.addLayer(med_dataset_2a.clip(AOI), rgbVis_natural_color, 'natural_color');
Map.addLayer(med_dataset_2a.clip(AOI), rgbVis_False_color, 'False color',false);
Map.addLayer(med_dataset_2a.clip(AOI), rgbVis_Color_Infrared, 'Color_Infrared',false);


Export.image.toDrive({
  image: med_dataset_2a.clip(geometry),
  description: 'Vin_'+num_area+'_Sent-2_'+year+'_'+STARTDAY+'_'+ENDDAY,
  folder: 'GEE data',
  scale: 10,
  region: geometry,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
  });

