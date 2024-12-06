/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 7.0, "series": [{"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[400.0, 1.0], [200.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[600.0, 3.0], [300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[300.0, 1.0], [400.0, 3.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[700.0, 3.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [5300.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [3900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[600.0, 3.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[300.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [400.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[600.0, 3.0], [300.0, 2.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[400.0, 4.0], [200.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[300.0, 3.0], [400.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[0.0, 5.0], [200.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[0.0, 5.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[0.0, 5.0], [100.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 2.0], [400.0, 2.0], [200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 615.0, "series": [{"data": [[0.0, 615.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 19.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.5590062111801273, "minX": 1.73346486E12, "maxY": 2.5590062111801273, "series": [{"data": [[1.73346486E12, 2.5590062111801273]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346486E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 5375.0, "series": [{"data": [[4.0, 4.0], [2.0, 4.0], [1.0, 1.5], [3.0, 8.333333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[2.4285714285714284, 5.142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 3.0], [1.0, 1.0], [3.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[2.4285714285714284, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 1.5], [3.0, 63.66666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[2.4285714285714284, 28.285714285714285]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28-Aggregated", "isController": false}, {"data": [[4.0, 534.0], [2.0, 491.0], [1.0, 219.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[2.4285714285714284, 392.85714285714283]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.0], [1.0, 2.5], [3.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[2.4285714285714284, 4.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22-Aggregated", "isController": false}, {"data": [[4.0, 673.0], [2.0, 326.0], [1.0, 185.0], [5.0, 642.0], [3.0, 676.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[2.5714285714285716, 430.42857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-Aggregated", "isController": false}, {"data": [[4.0, 6.0], [2.0, 3.0], [1.0, 3.0], [3.0, 3.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[2.4285714285714284, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23-Aggregated", "isController": false}, {"data": [[4.0, 20.0], [2.0, 2.0], [1.0, 2.5], [3.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[2.4285714285714284, 4.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24-Aggregated", "isController": false}, {"data": [[4.0, 421.5], [1.0, 211.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[2.7142857142857144, 331.2857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-Aggregated", "isController": false}, {"data": [[4.0, 7.0], [2.0, 4.0], [1.0, 2.0], [3.0, 3.666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[2.4285714285714284, 3.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25-Aggregated", "isController": false}, {"data": [[4.0, 735.25], [1.0, 253.33333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[2.7142857142857144, 528.7142857142858]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 13.0], [1.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[2.4285714285714284, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 5.0], [1.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[2.4285714285714284, 2.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10-Aggregated", "isController": false}, {"data": [[4.0, 2947.0], [2.0, 1887.5], [1.0, 1120.0], [5.0, 3944.0], [3.0, 5375.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[2.5714285714285716, 2611.5714285714284]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[4.0, 613.5], [1.0, 242.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[2.7142857142857144, 454.2857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[2.7142857142857144, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9-Aggregated", "isController": false}, {"data": [[4.0, 5.25], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[2.7142857142857144, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1-Aggregated", "isController": false}, {"data": [[4.0, 2.75], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[2.7142857142857144, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.0], [1.0, 3.0], [3.0, 3.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[2.4285714285714284, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20-Aggregated", "isController": false}, {"data": [[4.0, 3.25], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[2.7142857142857144, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2-Aggregated", "isController": false}, {"data": [[4.0, 3.25], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[2.7142857142857144, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.0], [1.0, 2.5], [3.0, 4.666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[2.4285714285714284, 3.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21-Aggregated", "isController": false}, {"data": [[4.0, 5.0], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[2.7142857142857144, 3.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3-Aggregated", "isController": false}, {"data": [[4.0, 8.25], [1.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[2.7142857142857144, 6.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 11.0], [1.0, 2.5], [3.0, 8.333333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[2.4285714285714284, 6.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 18.0], [1.0, 3.0], [3.0, 7.333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[2.4285714285714284, 6.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16-Aggregated", "isController": false}, {"data": [[4.0, 6.0], [2.0, 18.0], [1.0, 2.0], [3.0, 6.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[2.4285714285714284, 6.857142857142858]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [2.0, 6.0], [1.0, 2.5], [3.0, 2.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[2.4285714285714284, 2.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 12.0], [1.0, 3.5], [3.0, 4.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[2.4285714285714284, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11-Aggregated", "isController": false}, {"data": [[4.0, 4.0], [2.0, 2.0], [1.0, 2.5], [3.0, 2.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[2.4285714285714284, 2.714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 8.0], [1.0, 2.5], [3.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[2.4285714285714284, 3.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 2.0], [3.0, 6.333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[2.4285714285714284, 3.8571428571428568]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.0], [1.0, 1.5], [5.0, 3.0], [3.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[2.5714285714285716, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11-Aggregated", "isController": false}, {"data": [[4.0, 4.0], [2.0, 2.0], [1.0, 2.0], [3.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[2.4285714285714284, 3.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 1.5], [5.0, 4.0], [3.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[2.5714285714285716, 2.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.5], [1.0, 2.0], [5.0, 4.0], [3.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[2.5714285714285716, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9-Aggregated", "isController": false}, {"data": [[4.0, 9.0], [2.0, 2.5], [1.0, 2.0], [5.0, 4.0], [3.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[2.5714285714285716, 3.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8-Aggregated", "isController": false}, {"data": [[4.0, 440.0], [2.0, 496.0], [1.0, 284.5], [3.0, 1664.3333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[2.4285714285714284, 928.2857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-Aggregated", "isController": false}, {"data": [[4.0, 14.0], [2.0, 2.5], [1.0, 1.5], [5.0, 7.0], [3.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[2.5714285714285716, 4.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.5], [1.0, 1.5], [5.0, 4.0], [3.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[2.5714285714285716, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4-Aggregated", "isController": false}, {"data": [[4.0, 15.0], [2.0, 2.0], [1.0, 2.0], [5.0, 2.0], [3.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[2.5714285714285716, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.0], [1.0, 2.0], [5.0, 3.0], [3.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[2.5714285714285716, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 3.0], [1.0, 2.5], [3.0, 7.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[2.4285714285714284, 4.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 3.5], [1.0, 1.5], [5.0, 4.0], [3.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[2.5714285714285716, 3.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1-Aggregated", "isController": false}, {"data": [[4.0, 645.0], [2.0, 318.0], [1.0, 180.5], [5.0, 629.0], [3.0, 662.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[2.5714285714285716, 419.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0-Aggregated", "isController": false}, {"data": [[4.0, 8.0], [2.0, 2.5], [1.0, 2.0], [5.0, 3.0], [3.0, 7.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[2.5714285714285716, 3.8571428571428568]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3-Aggregated", "isController": false}, {"data": [[4.0, 10.0], [2.0, 2.5], [1.0, 1.5], [5.0, 2.0], [3.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[2.5714285714285716, 3.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2-Aggregated", "isController": false}, {"data": [[4.0, 4.0], [2.0, 16.0], [1.0, 10.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[2.4285714285714284, 8.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3-Aggregated", "isController": false}, {"data": [[4.0, 8.0], [2.0, 2.0], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[2.4285714285714284, 4.7142857142857135]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2-Aggregated", "isController": false}, {"data": [[4.0, 2.3333333333333335], [2.0, 2.0], [1.0, 4.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[2.4285714285714284, 3.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1-Aggregated", "isController": false}, {"data": [[4.0, 467.3333333333333], [2.0, 472.0], [1.0, 205.66666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[2.4285714285714284, 355.8571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [1.0, 1.6666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[2.7142857142857144, 2.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20-Aggregated", "isController": false}, {"data": [[4.0, 8.75], [1.0, 1.6666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[2.7142857142857144, 5.714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11-Aggregated", "isController": false}, {"data": [[4.0, 7.25], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[2.7142857142857144, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10-Aggregated", "isController": false}, {"data": [[4.0, 5.333333333333333], [2.0, 5.0], [1.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[2.4285714285714284, 4.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9-Aggregated", "isController": false}, {"data": [[4.0, 4.666666666666667], [2.0, 5.0], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[2.4285714285714284, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8-Aggregated", "isController": false}, {"data": [[4.0, 23.666666666666664], [2.0, 13.0], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[2.4285714285714284, 12.999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7-Aggregated", "isController": false}, {"data": [[4.0, 17.666666666666664], [2.0, 2.0], [1.0, 10.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[2.4285714285714284, 12.142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6-Aggregated", "isController": false}, {"data": [[4.0, 2.6666666666666665], [2.0, 2.0], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[2.4285714285714284, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5-Aggregated", "isController": false}, {"data": [[4.0, 4.666666666666667], [2.0, 2.0], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[2.4285714285714284, 3.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4-Aggregated", "isController": false}, {"data": [[4.0, 4.5], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[2.7142857142857144, 3.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8-Aggregated", "isController": false}, {"data": [[4.0, 16.5], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[2.7142857142857144, 10.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1-Aggregated", "isController": false}, {"data": [[4.0, 3.75], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[2.7142857142857144, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9-Aggregated", "isController": false}, {"data": [[4.0, 385.75], [1.0, 204.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[2.7142857142857144, 307.85714285714283]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [1.0, 3.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[2.7142857142857144, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4-Aggregated", "isController": false}, {"data": [[4.0, 4.25], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[2.7142857142857144, 3.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5-Aggregated", "isController": false}, {"data": [[4.0, 21.25], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[2.7142857142857144, 12.999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[2.7142857142857144, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4-Aggregated", "isController": false}, {"data": [[4.0, 26.5], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[2.7142857142857144, 16.000000000000004]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6-Aggregated", "isController": false}, {"data": [[4.0, 8.0], [1.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[2.7142857142857144, 5.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3-Aggregated", "isController": false}, {"data": [[4.0, 5.5], [1.0, 2.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[2.7142857142857144, 4.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7-Aggregated", "isController": false}, {"data": [[4.0, 13.25], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[2.7142857142857144, 8.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2-Aggregated", "isController": false}, {"data": [[4.0, 5.0], [2.0, 9.0], [1.0, 3.5], [3.0, 34.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[2.4285714285714284, 17.571428571428573]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7-Aggregated", "isController": false}, {"data": [[4.0, 8.5], [1.0, 1.6666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[2.7142857142857144, 5.571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18-Aggregated", "isController": false}, {"data": [[4.0, 5.0], [2.0, 3.0], [1.0, 5.0], [3.0, 165.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[2.4285714285714284, 73.28571428571428]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6-Aggregated", "isController": false}, {"data": [[4.0, 8.25], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[2.7142857142857144, 5.571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17-Aggregated", "isController": false}, {"data": [[4.0, 6.0], [2.0, 4.0], [1.0, 3.0], [3.0, 80.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[2.4285714285714284, 36.57142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[2.7142857142857144, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16-Aggregated", "isController": false}, {"data": [[4.0, 43.0], [2.0, 3.0], [1.0, 3.0], [3.0, 28.333333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[2.4285714285714284, 19.57142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4-Aggregated", "isController": false}, {"data": [[4.0, 2.75], [1.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[2.7142857142857144, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15-Aggregated", "isController": false}, {"data": [[4.0, 23.0], [2.0, 8.0], [1.0, 3.0], [3.0, 17.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[2.4285714285714284, 12.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3-Aggregated", "isController": false}, {"data": [[4.0, 7.0], [2.0, 5.0], [1.0, 3.0], [3.0, 24.666666666666668]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[2.4285714285714284, 13.142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2-Aggregated", "isController": false}, {"data": [[4.0, 4.0], [2.0, 5.0], [1.0, 3.0], [3.0, 107.33333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[2.4285714285714284, 48.142857142857146]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1-Aggregated", "isController": false}, {"data": [[4.0, 380.0], [2.0, 463.0], [1.0, 267.5], [3.0, 1282.3333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[2.4285714285714284, 746.4285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0-Aggregated", "isController": false}, {"data": [[4.0, 3.5], [1.0, 1.6666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[2.7142857142857144, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19-Aggregated", "isController": false}, {"data": [[4.0, 4.5], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[2.7142857142857144, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10-Aggregated", "isController": false}, {"data": [[4.0, 2.75], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[2.7142857142857144, 2.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14-Aggregated", "isController": false}, {"data": [[4.0, 3.25], [1.0, 1.6666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[2.7142857142857144, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13-Aggregated", "isController": false}, {"data": [[4.0, 11.0], [2.0, 2.0], [1.0, 3.0], [3.0, 44.33333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[2.4285714285714284, 21.714285714285715]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [1.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[2.7142857142857144, 1.8571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12-Aggregated", "isController": false}, {"data": [[4.0, 5.0], [2.0, 2.0], [1.0, 4.5], [3.0, 3.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[2.4285714285714284, 3.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8-Aggregated", "isController": false}, {"data": [[4.0, 87.5], [1.0, 2.3333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}, {"data": [[2.7142857142857144, 51.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 13401.966666666667, "minX": 1.73346486E12, "maxY": 375687.76666666666, "series": [{"data": [[1.73346486E12, 375687.76666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73346486E12, 13401.966666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346486E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1.8571428571428572, "minX": 1.73346486E12, "maxY": 2611.5714285714284, "series": [{"data": [[1.73346486E12, 5.142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[1.73346486E12, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[1.73346486E12, 28.285714285714285]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[1.73346486E12, 392.85714285714283]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[1.73346486E12, 4.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[1.73346486E12, 430.42857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[1.73346486E12, 4.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[1.73346486E12, 331.2857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 3.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[1.73346486E12, 528.7142857142858]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[1.73346486E12, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[1.73346486E12, 2.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[1.73346486E12, 2611.5714285714284]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.73346486E12, 454.2857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[1.73346486E12, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[1.73346486E12, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[1.73346486E12, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 3.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[1.73346486E12, 3.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[1.73346486E12, 6.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 6.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[1.73346486E12, 6.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[1.73346486E12, 6.857142857142858]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[1.73346486E12, 2.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[1.73346486E12, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 2.714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[1.73346486E12, 3.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[1.73346486E12, 3.8571428571428568]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 3.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[1.73346486E12, 2.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 3.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 928.2857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 4.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 4.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 3.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 419.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 3.8571428571428568]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 3.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 8.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[1.73346486E12, 4.7142857142857135]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[1.73346486E12, 3.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[1.73346486E12, 355.8571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[1.73346486E12, 2.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[1.73346486E12, 5.714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 4.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[1.73346486E12, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[1.73346486E12, 12.999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[1.73346486E12, 12.142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[1.73346486E12, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[1.73346486E12, 3.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[1.73346486E12, 3.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[1.73346486E12, 10.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[1.73346486E12, 307.85714285714283]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[1.73346486E12, 3.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 12.999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 16.000000000000004]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[1.73346486E12, 5.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 4.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[1.73346486E12, 8.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 17.571428571428573]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 5.571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[1.73346486E12, 73.28571428571428]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 5.571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[1.73346486E12, 36.57142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[1.73346486E12, 19.57142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[1.73346486E12, 12.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 13.142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 48.142857142857146]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 746.4285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[1.73346486E12, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[1.73346486E12, 2.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[1.73346486E12, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[1.73346486E12, 21.714285714285715]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 1.8571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[1.73346486E12, 3.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 51.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346486E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.73346486E12, "maxY": 2261.142857142857, "series": [{"data": [[1.73346486E12, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[1.73346486E12, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[1.73346486E12, 28.285714285714285]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[1.73346486E12, 353.42857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[1.73346486E12, 4.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[1.73346486E12, 414.1428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[1.73346486E12, 4.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[1.73346486E12, 300.57142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[1.73346486E12, 449.85714285714283]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[1.73346486E12, 2261.142857142857]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.73346486E12, 449.85714285714283]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 3.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 6.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[1.73346486E12, 6.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[1.73346486E12, 6.714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[1.73346486E12, 2.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[1.73346486E12, 4.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[1.73346486E12, 3.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[1.73346486E12, 3.8571428571428568]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 3.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 743.1428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 4.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 414.1428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[1.73346486E12, 353.42857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[1.73346486E12, 300.57142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 17.28571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 5.571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[1.73346486E12, 70.42857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 5.571428571428572]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[1.73346486E12, 36.42857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[1.73346486E12, 19.57142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[1.73346486E12, 12.285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 12.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 48.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 743.1428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 2.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[1.73346486E12, 3.5714285714285716]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[1.73346486E12, 2.428571428571429]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[1.73346486E12, 2.571428571428571]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[1.73346486E12, 16.42857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[1.73346486E12, 3.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 51.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346486E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.73346486E12, "maxY": 5.857142857142857, "series": [{"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 0.2857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[1.73346486E12, 5.857142857142857]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[1.73346486E12, 1.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714285]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714285]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[1.73346486E12, 0.2857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[1.73346486E12, 0.2857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[1.73346486E12, 0.5714285714285715]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 0.5714285714285715]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 5.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[1.73346486E12, 0.5714285714285715]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 0.5714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 0.5714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 0.7142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[1.73346486E12, 0.7142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[1.73346486E12, 2.4285714285714284]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[1.73346486E12, 1.142857142857143]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[1.73346486E12, 2.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[1.73346486E12, 1.7142857142857144]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 1.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714285]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[1.73346486E12, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[1.73346486E12, 2.2857142857142856]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[1.73346486E12, 1.7142857142857142]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[1.73346486E12, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[1.73346486E12, 0.4285714285714286]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[1.73346486E12, 1.1428571428571428]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[1.73346486E12, 5.857142857142857]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[1.73346486E12, 0.14285714285714288]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[1.73346486E12, 0.5714285714285714]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[1.73346486E12, 1.1428571428571428]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[1.73346486E12, 0.28571428571428575]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346486E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.73346486E12, "maxY": 2924.0, "series": [{"data": [[1.73346486E12, 2924.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73346486E12, 206.20000000000005]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73346486E12, 792.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73346486E12, 436.4000000000001]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73346486E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73346486E12, 3.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346486E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 30.0, "maxY": 7.5, "series": [{"data": [[135.0, 4.0], [78.0, 2.0], [39.0, 2.0], [104.0, 3.0], [113.0, 4.0], [30.0, 4.0], [60.0, 7.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 135.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 30.0, "maxY": 7.5, "series": [{"data": [[135.0, 2.0], [78.0, 2.0], [39.0, 0.0], [104.0, 0.0], [113.0, 0.0], [30.0, 3.0], [60.0, 7.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 135.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 10.616666666666667, "minX": 1.73346486E12, "maxY": 10.616666666666667, "series": [{"data": [[1.73346486E12, 10.616666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346486E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 5.133333333333334, "minX": 1.73346486E12, "maxY": 5.483333333333333, "series": [{"data": [[1.73346486E12, 5.483333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73346486E12, 5.133333333333334]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346486E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.11666666666666667, "minX": 1.73346486E12, "maxY": 0.11666666666666667, "series": [{"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8-success", "isController": false}, {"data": [[1.73346486E12, 0.11666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346486E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 10.733333333333333, "minX": 1.73346486E12, "maxY": 10.733333333333333, "series": [{"data": [[1.73346486E12, 10.733333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346486E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
