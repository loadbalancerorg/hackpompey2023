<?php
/*************************************************************************
 * ThreeDeepBreaths
 * 
 * Just take three deep breaths, mate. You'll figure it out.
 * 
 * @author Andrew Zach <andy@loadbalancer.org>
 *         Emma Rayfield <emma@loadbalancer.org>
 *         Nicholas Turnbull <nturnbull@loadbalancer.org>
 *
 * @version 0.0.1
 *
 *************************************************************************/


class ThreeDeepBreathsAPI {
    
    public $jsonFilePath = "knowledge.json";
    public $knowledgeBase = array();
    public $apiVersion = "1";
    
    public function serveRequest($requestParams) {
        $loadSuccess = $this->loadKnowledgeTree();
        $response = array(
            "appName" => "ThreeDeepBreaths",
            "apiVersion" => $this->apiVersion,
            "success" => false
        );
        if ($loadSuccess) {
            if (array_key_exists("scenario", $requestParams)
                && array_key_exists("node", $requestParams)
                && array_key_exists("input", $requestParams)) {
                $response = array_merge($response, 
                    $this->generateResponse(
                    $requestParams["scenario"], 
                    $requestParams["node"], 
                    $requestParams["input"]));
            }
            else {
                $response["errorMessage"] = "invalid_request:"
                    . "Parameters are 'scenario', 'node' and 'input'";
            }
        }
        else {
            $response["errorMessage"] = "internal_error";
        }
        return json_encode($response, JSON_PRETTY_PRINT);
    }

    
    public function loadKnowledgeTree() {
        $knowledgeJSON = file_get_contents($this->jsonFilePath);
        $this->knowledgeBase = json_decode($knowledgeJSON, true);
        if ($this->knowledgeBase == null) {
            return false;
        }
        else {
            return true;
        }
    }
   
    
    public function generateResponse($scenario = "", $nodeID = "", $input = "") {
        $response = array();
        $response["success"] = false;
        if (trim($nodeID) == "") {
            $nodeID = "default";
        }
        if ($scenario == "") {
            $response["responseType"] = "list";
            $response["scenarioList"] = array_keys($this->knowledgeBase);
        }
        else if (!array_key_exists($scenario, $this->knowledgeBase)) {
            $response["errorMessage"] = "scenario_not_found";
        }
        else if (!array_key_exists($nodeID, $this->knowledgeBase[$scenario])) {
            $response["errorMessage"] = "node_not_found";
        }
        else if (!array_key_exists("options", $this->knowledgeBase[$scenario][$nodeID])) {
            $response["errorMessage"] = "kb_missing_options";
        }
        else {
            $nextNodeID = "";
            if ($input == "") {
                $nextNodeID = $nodeID;
            }
            else {
                $optionList = $this->knowledgeBase[$scenario][$nodeID]["options"];
                if (!array_key_exists($input, $optionList)) {
                    $response["errorMessage"] = "option_not_recognised";
                }
                else if (!array_key_exists($optionList[$input], 
                    $this->knowledgeBase[$scenario])) {
                    $response["errorMessage"] = "node_not_found";
                }
                else {
                    $nextNodeID = $optionList[$input];
                }
            }
            if ($nextNodeID != "") {
                $nextNodeFields = $this->knowledgeBase[$scenario][$nextNodeID];
                $response["node"] = $nextNodeID;
                $response["success"] = true;
                $response["msg"] = $nextNodeFields["msg"];
                $response["options"] = $nextNodeFields["options"];
            }
        }
        return $response;
    }
    
    public function setPHPLoggingMode($debug = false) {
        ini_set('display_errors', (int) $debug);
        ini_set('display_startup_errors', (int) $debug);
        if ($debug == true) {
            error_reporting(E_ALL);
        }
        else {
            error_reporting(E_ERROR);
        }
    }
    
    public function run() {
        $this->setPHPLoggingMode(true);
        $requestString = "";
        if (php_sapi_name() != 'cli') {
            $paramSplit = explode("?", $_SERVER['REQUEST_URI']);
            if (count($paramSplit) >= 2) {
                $requestString = $paramSplit[1];
            }
        }
        else {
            global $argv;
            if (count($argv) > 0) {
                unset($argv[0]);
            }
            $requestString = implode("", $argv);
        }
        
        $requestParams = array();
        parse_str($requestString, $requestParams);
        //print_r($requestParams);
        print $this->serveRequest($requestParams) . "\n";
    }
}

$api = new ThreeDeepBreathsAPI();
$api->run();

?>